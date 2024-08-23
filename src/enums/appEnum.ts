/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 10:40:39
 * @LastEditors: LLiuHuan
 */
/**
 * @description: Menu blend mode width - [菜单混合模式宽度]
 */
export const SIDE_BAR_MINI_WIDTH = 48;
export const SIDE_BAR_SHOW_TIT_MINI_WIDTH = 80;

/**
 * @description Theme enum - [主题枚举]
 */
export enum AppEnum {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto',
}

export interface AppEnumType {
  [AppEnum.DARK]: string;
  [AppEnum.LIGHT]: string;
  [AppEnum.AUTO]?: string;
}

// Route switching animation
// 路由切换动画
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SLIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}

export enum ThemeColorEnum {
  // 信息色
  PRIMARY = 'primary',
  // 成功
  SUCCESS = 'green',
  // 警告
  WARNING = 'orange',
  // 错误
  ERROR = 'red',
}

export enum SessionTimeoutProcessingEnum {
  ROUTE_JUMP,
  PAGE_COVERAGE,
}

export enum SettingButtonPositionEnum {
  AUTO = 'auto',
  HEADER = 'header',
  FIXED = 'fixed',
}

/**
 * 权限模式
 */
export enum PermissionModeEnum {
  // role
  // 角色权限
  ROLE = 'ROLE',
  // black
  // 后端
  BACK = 'BACK',
}

export enum LocaleEnum {
  zh_CN = 'zh-CN',
  en_US = 'en-US',
}
