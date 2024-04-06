/**
 * @description Theme enum - [主题枚举]
 */
export enum AppEnum {
  DARK = 'dark',
  LIGHT = 'light',
  AUTO = 'auto',
}

// Route switching animation
// 路由切换动画
export enum RouterTransitionEnum {
  ZOOM_FADE = 'zoom-fade',
  ZOOM_OUT = 'zoom-out',
  FADE_SIDE = 'fade-slide',
  FADE = 'fade',
  FADE_BOTTOM = 'fade-bottom',
  FADE_SCALE = 'fade-scale',
}

// Route switching animation
// 路由切换动画
export enum RouterTransitionI18nEnum {
  'zoom-fade' = '渐变',
  'zoom-out' = '闪现',
  'fade-slide' = '滑动',
  'fade' = '消退',
  'fade-bottom' = '底部消退',
  'fade-scale' = '缩放消退',
}

export enum ThemeColorEnum {
  // 主色
  PRIMARY = 'arcoblue',
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
