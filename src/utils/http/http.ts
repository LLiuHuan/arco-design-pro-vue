import type {
  AxiosRequestConfig,
  AxiosInstance,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import axios from 'axios';
import qs from 'qs';
import { cloneDeep } from 'lodash-es';
import { isFunction } from '@/utils/common';
import type { RequestOptions, Result, UploadFileParams } from '~/types/axios';
import { ContentTypeEnum, RequestEnum } from '@/enums/httpEnum';
import type { CreateAxiosOptions } from './httpTransform';
import { AxiosCanceler } from './httpCancel';

export * from './httpTransform';

/**
 * @description:  axios module - [axios模块]
 */
export class HTTP {
  // axios实例对象
  private axiosInstance: AxiosInstance;

  // axios配置选项
  private readonly options: CreateAxiosOptions;

  // 构造函数
  constructor(options: CreateAxiosOptions) {
    this.options = options;
    this.axiosInstance = axios.create(options);
    this.setupInterceptors();
  }

  /**
   * @description:  Create axios instance - [创建axios实例]
   */
  private createAxios(config: CreateAxiosOptions): void {
    this.axiosInstance = axios.create(config);
  }

  /**
   * @description:  Get transform - [获取 transform]
   * @private
   */
  private getTransform() {
    const { transform } = this.options;
    return transform;
  }

  /**
   * @description:  Get axios instance - [获取axios实例]
   */
  getAxios(): AxiosInstance {
    return this.axiosInstance;
  }

  /**
   * @description: Reconfigure axios - [重新创建axios]
   */
  configAxios(config: CreateAxiosOptions) {
    if (!this.axiosInstance) {
      return;
    }
    this.createAxios(config);
  }

  /**
   * @description: Set general header - [设置通用请求头]
   */
  setHeader(headers: any): void {
    if (!this.axiosInstance) {
      return;
    }
    Object.assign(this.axiosInstance.defaults.headers, headers);
  }

  /**
   * @description: Interceptor configuration - [拦截器配置]
   */
  private setupInterceptors() {
    // const transform = this.getTransform();
    const {
      axiosInstance,
      options: { transform },
    } = this;
    if (!transform) {
      return;
    }
    const {
      requestInterceptors, // 请求拦截器
      requestInterceptorsCatch, // 请求拦截器错误捕获
      responseInterceptors, // 响应拦截器
      responseInterceptorsCatch, // 响应拦截器错误捕获
    } = transform;

    const axiosCanceler = new AxiosCanceler();

    // Request interceptor configuration processing - [请求拦截器配置处理]
    this.axiosInstance.interceptors.request.use(
      (config: InternalAxiosRequestConfig) => {
        // If cancel repeat request is turned on, then cancel repeat request is prohibited - [如果开启了取消重复请求，则禁止取消重复请求]
        const requestOptions =
          (config as unknown as any).requestOptions ??
          this.options.requestOptions;
        const ignoreCancelToken = requestOptions?.ignoreCancelToken ?? true;

        if (!ignoreCancelToken) {
          axiosCanceler.addPending(config);
        }

        if (requestInterceptors && isFunction(requestInterceptors)) {
          config = requestInterceptors(config, this.options);
        }
        return config;
      },
      (error: AxiosError) => {
        if (requestInterceptorsCatch && isFunction(requestInterceptorsCatch)) {
          return requestInterceptorsCatch(error);
        }
        return Promise.reject(error);
      },
    );

    // Request interceptor error capture - [请求拦截器错误捕获]
    // requestInterceptorsCatch &&
    //   isFunction(requestInterceptorsCatch) &&
    //   this.axiosInstance.interceptors.request.use(
    //     undefined,
    //     requestInterceptorsCatch,
    //   );

    // Response result interceptor processing - [响应结果拦截器处理]
    this.axiosInstance.interceptors.response.use(
      (res: AxiosResponse<any>) => {
        if (res) {
          axiosCanceler.removePending(res.config);
        }
        if (responseInterceptors && isFunction(responseInterceptors)) {
          res = responseInterceptors(res);
        }
        return res;
      },
      (error: AxiosError) => {
        if (
          responseInterceptorsCatch &&
          isFunction(responseInterceptorsCatch)
        ) {
          return responseInterceptorsCatch(axiosInstance, error);
        }
        return Promise.reject(error);
      },
    );

    // Response result interceptor error capture - [响应结果拦截器错误捕获]
    // responseInterceptorsCatch &&
    //   isFunction(responseInterceptorsCatch) &&
    //   this.axiosInstance.interceptors.response.use(undefined, (error) => {
    //     return responseInterceptorsCatch(axiosInstance, error);
    //   });
  }

  /**
   * @description:  File Upload - [文件上传]
   */
  uploadFile<T = any>(config: AxiosRequestConfig, params: UploadFileParams) {
    const formData = new window.FormData();
    const customFilename = params.name || 'file';

    if (params.filename) {
      formData.append(customFilename, params.file, params.filename);
    } else {
      formData.append(customFilename, params.file);
    }

    if (params.data) {
      Object.keys(params.data).forEach((key) => {
        const value = params.data![key];
        if (Array.isArray(value)) {
          value.forEach((item) => {
            formData.append(`${key}[]`, item);
          });
          return;
        }

        formData.append(key, params.data![key]);
      });
    }

    return this.axiosInstance.request<T>({
      ...config,
      method: RequestEnum.POST,
      data: formData,
      headers: {
        'Content-type': ContentTypeEnum.FORM_DATA,
        // @ts-ignore
        'ignoreCancelToken': true,
      },
    });
  }

  /**
   * @description: Support form-data - [支持form-data]
   * @param config
   */
  supportFormData(config: AxiosRequestConfig) {
    const headers = config.headers || this.options.headers;
    const contentType = headers?.['Content-Type'] || headers?.['content-type'];

    if (
      contentType !== ContentTypeEnum.FORM_URLENCODED ||
      !Reflect.has(config, 'data') ||
      config.method?.toUpperCase() === RequestEnum.GET
    ) {
      return config;
    }

    return {
      ...config,
      data: qs.stringify(config.data, { arrayFormat: 'brackets' }),
    };
  }

  /**
   * @description:  Get request method - [get请求方法]
   */
  get<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.GET }, options);
  }

  /**
   * @description:  Post request method - [post请求方法]
   * @param config
   * @param options
   */
  post<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.POST }, options);
  }

  /**
   * @description:  Put request method - [put请求方法]
   * @param config
   * @param options
   */
  put<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.PUT }, options);
  }

  /**
   * @description:  Delete request method - [delete请求方法]
   * @param config
   * @param options
   */
  delete<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    return this.request({ ...config, method: RequestEnum.DELETE }, options);
  }

  /**
   * @description:  Request method - [请求方法]
   * @param config
   * @param options
   */
  request<T = any>(
    config: AxiosRequestConfig,
    options?: RequestOptions,
  ): Promise<T> {
    let conf: CreateAxiosOptions = cloneDeep(config);
    // cancelToken 如果被深拷贝，会导致最外层无法使用cancel方法来取消请求
    if (config.cancelToken) {
      conf.cancelToken = config.cancelToken;
    }

    if (config.signal) {
      conf.signal = config.signal;
    }

    const transform = this.getTransform();

    const { requestOptions } = this.options;

    const opt: RequestOptions = { ...requestOptions, ...options };

    const { beforeRequestHook, requestCatchHook, transformResponseHook } =
      transform || {};
    if (beforeRequestHook && isFunction(beforeRequestHook)) {
      conf = beforeRequestHook(conf, opt);
    }
    conf.requestOptions = opt;

    conf = this.supportFormData(conf);

    return new Promise((resolve, reject) => {
      this.axiosInstance
        .request<any, AxiosResponse<Result>>(conf)
        .then((res: AxiosResponse<Result>) => {
          if (transformResponseHook && isFunction(transformResponseHook)) {
            try {
              const ret = transformResponseHook(res, opt);
              resolve(ret);
            } catch (err) {
              reject(err || new Error('request error!'));
            }
            return;
          }
          resolve(res as unknown as Promise<T>);
        })
        .catch((e: Error | AxiosError) => {
          if (requestCatchHook && isFunction(requestCatchHook)) {
            reject(requestCatchHook(e, opt));
            return;
          }
          if (axios.isAxiosError(e)) {
            // rewrite error message from axios in here
          }
          reject(e);
        });
    });
  }
}
