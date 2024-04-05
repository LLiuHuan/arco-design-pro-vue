import {
  APP_DARK_MODE_IS_AUTO_KEY,
  LOCALE_KEY,
  LOGIN_INFO,
  MenuModeEnum,
  MenuTypeEnum,
  MULTIPLE_TABS_KEY,
  PROJ_CFG_KEY,
  REFRESH_TOKEN_KEY,
  ROLES_KEY,
  TOKEN_KEY,
  USER_INFO_KEY,
} from '@/enums';
import type { LocaleSetting, ProjectConfig } from '~/types/config';
import { ErrorTypeEnum } from '@/enums/exceptionEnum';
import { RouteLocationNormalized } from 'vue-router';

declare namespace StorageInterface {
  interface BasicStore {
    /** 本地语言缓存 */
    [LOCALE_KEY]: LocaleSetting;
    /** 用户token */
    [TOKEN_KEY]: string;
    [REFRESH_TOKEN_KEY]: string;
    /** 项目配置 */
    [PROJ_CFG_KEY]: ProjectConfig | null;
    /** 多标签页列表 */
    [MULTIPLE_TABS_KEY]: RouteLocationNormalized[];
    /** 用户信息 */
    [USER_INFO_KEY]: ApiAuth.loginByTokenResult;
    /** 是否开启自动切换主题 */
    [APP_DARK_MODE_IS_AUTO_KEY]: boolean;
    /** 登录信息 */
    [LOGIN_INFO]: Auth.LoginInfo;
    /** 角色列表 */
    [ROLES_KEY]: Auth.RoleType[];
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

// When the window shrinks, remember some states, and restore these states when the window is restored
// [当窗口缩小时，记住一些状态，当窗口恢复时恢复这些状态]
export interface BeforeMiniState {
  menuCollapsed?: boolean;
  menuSplit?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
