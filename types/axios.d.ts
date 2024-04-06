export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;
export type SuccessMessageMode = ErrorMessageMode;

/**
 * @description: Retry request configuration - [重试请求配置]
 */
export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

/**
 * @description: Request options - [请求配置]
 */
export interface RequestOptions {
  // Splicing request parameters to url - [拼接请求参数到url]
  joinParamsToUrl?: boolean;
  // Format request parameter time - [格式化请求参数时间]
  formatDate?: boolean;
  // Whether to process the request result - [是否处理请求结果]
  isTransformResponse?: boolean;
  // Whether to return native response headers - [是否返回原生响应头]
  // For example: use this attribute when you need to get the response headers - [例如：当需要获取响应头时使用此属性]
  isReturnNativeResponse?: boolean;
  // Whether to join url - [是否加入url]
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank - [接口地址，不填则使用默认的apiUrl]
  apiUrl?: string;
  // Request splicing path - [请求拼接路径]
  urlPrefix?: string;
  // Error message prompt type - [错误信息提示类型]
  errorMessageMode?: ErrorMessageMode;
  // Success message prompt type - [成功消息提示类型]
  successMessageMode?: SuccessMessageMode;
  // Whether to add a timestamp - [是否添加时间戳]
  joinTime?: boolean;
  // Whether to enable cancellation of duplicate requests - [是否开启取消重复请求]
  ignoreCancelToken?: boolean;
  // Whether to send token in header - [是否在 header 中发送 token]
  withToken?: boolean;
  // Request retry mechanism - [请求重试机制]
  retryRequest?: RetryRequest;

  // Whether to display the message - [是否显示提示信息]
  isShowMessage?: boolean;
  // Custom processing return content deconstruction format - [自定义处理返回内容解构格式]
  respDeconstruct?: (resp: any) => Result;
  // Success status - [成功状态]
  successCode?: number;
  // Timeout state - [超时状态]
  timeoutCode?: number;
}

/**
 * @description: Request result - [请求结果]
 */
export interface Result<T = any> {
  code: number;
  type: 'success' | 'error' | 'warning';
  message: string;
  data: T;
}

/**
 * @description: multipart/form-data: upload file - [multipart/form-data: 上传文件]
 */
export interface UploadFileParams {
  // Other parameters
  data?: Recordable;
  // File parameter interface field name
  name?: string;
  // file name
  file: File | Blob;
  // file name
  filename?: string;
  [key: string]: any;
}
