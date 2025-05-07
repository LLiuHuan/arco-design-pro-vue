import {
  APP_DARK_MODE_IS_AUTO_KEY,
  APP_DARK_MODE_KEY,
  AppEnum,
  LOCALE_KEY,
  LOCK_INFO_KEY,
  LOGIN_INFO,
  MenuModeEnum,
  MULTIPLE_TABS_KEY,
  PROJ_CFG_KEY,
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums';
import type { LocaleType, ProjectConfig } from '~/types/config';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { LoginParams, UserInfoModel } from '@/api/auth/model/userModel';
import { App } from '~/types/app';

// When the window shrinks, remember some states, and restore these states when the window is restored
// [当窗口缩小时，记住一些状态，当窗口恢复时恢复这些状态]
export interface BeforeMiniState {
  layoutMode?: MenuModeEnum;
  siderCollapsed?: boolean;
}

// 锁屏信息
// Lock screen information
export interface LockInfo {
  // 要求输入密码
  // Password required
  pwd?: string | undefined;
  // 是否已锁定？
  // Is it locked?
  isLock?: boolean;
}

declare namespace StorageInterface {
  interface BasicStore {
    /** 本地语言缓存 */
    [LOCALE_KEY]: LocaleType;
    /** 用户token */
    [TOKEN_KEY]: string;
    [REFRESH_TOKEN_KEY]: string;
    /** 项目配置 */
    [PROJ_CFG_KEY]: ProjectConfig | null;
    /** 多标签页列表 */
    [MULTIPLE_TABS_KEY]: App.Tab[];
    /** 用户信息 */
    [USER_INFO_KEY]: UserInfoModel;
    /** 是否开启自动切换主题 */
    [APP_DARK_MODE_IS_AUTO_KEY]: boolean;
    /** 登录信息 */
    [LOGIN_INFO]: LoginParams;
    /** 角色列表 */
    [ROLES_KEY]: string[];
    /** 锁屏信息 */
    [LOCK_INFO_KEY]: LockInfo;
    /** 主题模式 */
    [APP_DARK_MODE_KEY]: AppEnum;
  }

  /** The type of data stored in session Storage - [sessionStorage的存储数据的类型] */
  type Session = BasicStore;

  /** The type of data stored in local Storage - [localStorage的存储数据的类型] */
  type Local = BasicStore;

  /** Basic storage key type - [基础存储键类型] */
  export type BasicKeys = keyof BasicStore;
}

/**
 * @description Error log information - [错误日志信息]
 */
export interface ErrorLogInfo {
  // Type of error - [错误类型]
  type: ErrorTypeEnum;
  // Error file - [错误文件]
  file: string;
  // Error line number - [错误行号]
  colno?: number;
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
