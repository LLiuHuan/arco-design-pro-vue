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
  'zoom-fade' = 'settings.theme.animate.mode.zoom-fade',
  'zoom-out' = 'settings.theme.animate.mode.zoom-out',
  'fade-slide' = 'settings.theme.animate.mode.fade-slide',
  'fade' = 'settings.theme.animate.mode.fade',
  'fade-bottom' = 'settings.theme.animate.mode.fade-bottom',
  'fade-scale' = 'settings.theme.animate.mode.fade-scale',
}

export enum EnumLanguage {
  'zh-CN' = '简体中文',
  'en-US' = 'English',
}
