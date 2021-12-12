/**
 * @description:  axios模块
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CreateAxiosOptions, RequestOptions, Result } from '@/utils/http/axios/types';
import { AxiosCanceler } from '@/utils/http/axios/axiosCancel';
import { isFunction } from '@/utils/is';
import { cloneDeep } from 'lodash-es';

export class VAxios {
  private axiosInstance: AxiosInstance;
  private options: CreateAxiosOptions;

  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  创建axios实例
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description:  获取Transform
   */
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * @description:  获取axios对象
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: 重新配置axios
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: 设置通用header
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description:  拦截器配置
   */
  private setupInterceptors() {
    // 获取Transform
    const transform = this.getTransform();
    if (!transform) {
      return;
    }
    const {
      requestInterceptors, // 请求之前的拦截器
      requestInterceptorsCatch, // 请求之前的拦截器错误处理
      responseInterceptors, // 请求之后的拦截器
      responseInterceptorsCatch, // 请求之后的拦截器错误处理
    } = transform;

    // 创建个取消对象
    const axiosCanceler = new AxiosCanceler();

    // 请求拦截器配置处理
    this.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      // 是否忽略请求
      const { headers: { ignoreCancelToken } = { ignoreCancelToken: false } } = config;
      // 将需要忽略的请求添加进去
      !ignoreCancelToken && axiosCanceler.addPending(config);
      // 判断请求之前的拦截器是否存在，存在的话是否是方法，如果是那就执行一下
      if (requestInterceptors && isFunction(requestInterceptors)) {
        config = requestInterceptors(config);
      }
      return config;
    }, undefined);

    // 请求拦截器错误捕获
    requestInterceptorsCatch &&
      isFunction(requestInterceptorsCatch) &&
      this.axiosInstance.interceptors.request.use(undefined, requestInterceptorsCatch);

    // 响应结果拦截器处理
    this.axiosInstance.interceptors.response.use((res: AxiosResponse<any>) => {
      res && axiosCanceler.removePending(res.config);
      if (responseInterceptors && isFunction(responseInterceptors)) {
        res = responseInterceptors(res);
      }
      return res;
    }, undefined);

    // 响应结果拦截器错误捕获
    responseInterceptorsCatch &&
      isFunction(responseInterceptorsCatch) &&
      this.axiosInstance.interceptors.response.use(undefined, responseInterceptorsCatch);
  }

  /**
   * @description:   请求方法
   */
  request<T = any>(config: AxiosRequestConfig, options?: RequestOptions): Promise<T> {
    let conf: AxiosRequestConfig = cloneDeep(config);
    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = Object.assign({}, requestOptions, options);

    const { beforeRequestHook, requestCatch, transformRequestData } = transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          // 请求是否被取消
          const isCancel = axios.isCancel(res);
          if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
            const ret = transformRequestData(res, opt, reject);
            ret !== undefined ? resolve(ret) : reject(new Error('request error!'));
            return resolve(ret);
          }
          reject(res as unknown as Promise<T>);
        })
        .catch((e: Error) => {
          if (requestCatch && isFunction(requestCatch)) {
            reject(requestCatch(e));
            return;
          }
          reject(e);
        });
    });
  }
}
