/**
 * Data processing class, can be configured according to the project - [数据处理类，可根据项目配置]
 */
import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import type { RequestOptions, Result } from '~/types/axios';

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  // eslint-disable-next-line no-use-before-define
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}

export abstract class AxiosTransform {
  /**
   * @description A function that is called before a request is sent. It can modify the request configuration as needed. - [在发送请求之前调用的函数。它可以根据需要修改请求配置。]
   */
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions,
  ) => AxiosRequestConfig;

  /**
   * @description: Process response data - [处理响应数据]
   */
  transformResponseHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions,
  ) => any;

  /**
   * @description: Request failed processing - [请求失败处理]
   */
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;

  /**
   * @description: Request interceptor - [请求之前的拦截器]
   */
  requestInterceptors?: (
    config: InternalAxiosRequestConfig,
    options: CreateAxiosOptions,
  ) => InternalAxiosRequestConfig;

  /**
   * @description: Response interceptor - [请求之后的拦截器]
   */
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * @description: Request interceptor error handling - [请求之前的拦截器错误处理]
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * @description: Response interceptor error handling - [请求之后的拦截器错误处理]
   */
  responseInterceptorsCatch?: (
    axiosInstance: AxiosInstance,
    error: Error,
  ) => void;
}
