import { LOCALE_KEY, TOKEN_KEY } from '@/enums';
import type { LocaleSetting } from '~/types/config';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';

declare namespace StorageInterface {
  /** The type of data stored in session Storage - [sessionStorage的存储数据的类型] */
  interface Session {
    /** 用户token */
    [TOKEN_KEY]: string;
  }

  /** The type of data stored in local Storage - [localStorage的存储数据的类型] */
  interface Local {
    /** 本地语言缓存 */
    [LOCALE_KEY]: LocaleSetting;
    /** 用户token */
    [TOKEN_KEY]: string;
  }
}

/**
 * @description Error log information - [错误日志信息]
 */
export interface ErrorLogInfo {
  // Type of error - [错误类型]
  type: ErrorTypeEnum;
  // Error file - [错误文件]
  file: string;
  // Error name - [错误名称]
  name?: string;
  // Error message - [错误信息]
  message: string;
  // Error stack - [错误堆栈]
  stack?: string;
  // Error detail - [错误详情]
  detail: string;
  // Error url - [错误地址]
  url: string;
  // Error time - [错误时间]
  time?: string;
}
