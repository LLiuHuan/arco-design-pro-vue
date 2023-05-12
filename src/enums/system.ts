/** 布局组件的名称 */
export enum EnumLayoutComponentName {
  basic = 'basic-layout',
  blank = 'blank-layout',
}

/** 布局模式 */
export enum EnumThemeLayoutMode {
  'vertical' = 'settings.layout.mode.vertical',
  'horizontal' = 'settings.layout.mode.horizontal',
  'vertical-mix' = 'settings.layout.mode.vertical-mix',
  'horizontal-mix' = 'settings.layout.mode.horizontal-mix',
}

/** 多页签风格 */
export enum EnumThemeTabMode {
  'chrome' = '谷歌风格',
  'button' = '按钮风格',
}

/** 水平模式的菜单位置 */
export enum EnumThemeHorizontalMenuPosition {
  'flex-start' = '居左',
  'center' = '居中',
  'flex-end' = '居右',
}

/** 过渡动画类型 */
export enum EnumThemeAnimateMode {
  'zoom-fade' = '渐变',
  'zoom-out' = '闪现',
  'fade-slide' = '滑动',
  'fade' = '消退',
  'fade-bottom' = '底部消退',
  'fade-scale' = '缩放消退',
}

export enum EnumLanguage {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}
