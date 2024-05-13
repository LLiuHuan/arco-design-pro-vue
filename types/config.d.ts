import {
  CacheTypeEnum,
  RouterTransitionEnum,
  ThemeColorEnum,
  AppEnum,
  TriggerEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  PermissionModeEnum,
  MixSidebarTriggerEnum,
  MenuModeEnum,
} from '@/enums';

export type LocaleType = 'zh-CN' | 'en-US'; // | 'ja-JP' | 'ko-KR'

// TODO: 可能需要修改
export interface GlobEnvConfig {
  // 项目标题，用于显示在浏览器标签和站点标题
  VITE_GLOB_APP_TITLE: string;
  // 项目地址
  VITE_GLOB_API_URL: string;
  // 项目地址前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // 上传地址
  VITE_GLOB_UPLOAD_URL?: string;
  // 项目标题简称
  VITE_GLOB_APP_SHORT_TITLE?: string;
}

export interface LocaleSetting {
  showPicker: boolean;
  // 当前语言
  // Current language
  locale: LocaleType;
  // 默认语言
  // default language
  fallback: LocaleType;
  // 可用语言
  // available Locales
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  // 是否开启页面切换动画
  // Whether to open the page switching animation
  enable: boolean;
  // 路由基本切换动画
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // 是否开启页面切换loading
  // Whether to open page switching loading
  openPageLoading: boolean;
  // 是否开启顶部进度条
  // Whether to open the top progress bar
  openNProgress: boolean;
}

export interface MultiTabsSetting {
  // 是否开启tab
  // Whether to enable tab
  cache: boolean;
  // 是否显示tab
  // Whether to display tab
  show: boolean;
  // 是否显示快捷按钮 下拉操作
  // Whether to display the quick button
  showQuick: boolean;
  // 是否允许拖拽
  // Whether to allow drag and drop
  canDrag: boolean;
  // 是否显示刷新按钮
  // Whether to display the refresh button
  showRedo: boolean;
  // 是否显示折叠按钮 全屏内容
  // Whether to display the fold button
  showFold: boolean;
  // fold模式下自动收起标签页
  // Automatically collapse tabs in fold mode
  autoCollapse: boolean;
  // tab 高度
  // Tab height
  height: number;
}

export interface LayoutSetting {
  // 菜单模式
  // Menu mode
  mode: MenuModeEnum;

  // 滚动模式
  // Scroll mode
  scrollMode: ThemeScrollMode;
}

export interface MenuSetting {
  // 背景颜色
  // Background color
  bgColor: string;
  // 是否折叠菜单
  // Whether to collapse the menu
  collapsed?: boolean;
  // 菜单宽度
  // Menu width
  menuWidth: number;
  // 菜单折叠宽度
  // Menu collapse width
  collapsedMenuWidth: number;
  // 混合菜单宽度
  // Mix menu width
  mixMenuWidth: number;
  // 混合菜单折叠宽度
  // Mix menu collapse width
  mixCollapsedMenuWidth: number;
  // 混合菜单子宽度
  // Mix menu child width
  mixChildMenuWidth: number;
  // 侧边栏是否隐藏
  // Whether the sidebar is hidden
  siderHidden?: boolean;
  // 菜单主题
  // Menu theme
  theme: AppEnum;
  // 是否开启手风琴模式
  // Whether to enable handover
  accordion: boolean;

  // 菜单折叠触发器位置
  // Menu collapse trigger position
  trigger: TriggerEnum;
  // 拖动侧边栏
  // Drag the sidebar
  canDrag: boolean;
  // 混合菜单是否固定
  // Is the mixed menu fixed?
  mixSideFixed: boolean;
  // 混合菜单触发器位置
  // Mixed menu trigger position
  mixSideTrigger: MixSidebarTriggerEnum;

  // 路由切换时是否关闭混合菜单
  // Whether to close the mixed menu when the route changes
  closeMixSidebarOnChange?: boolean;
}

export interface ThemeSettingColors {
  /**
   * @description 主题色
   * @description Primary color
   */
  [ThemeColorEnum.PRIMARY]: string;
  /**
   * @description 成功色
   * @description Success color
   */
  [ThemeColorEnum.SUCCESS]: string;
  /**
   * @description 警告色
   * @description Warning color
   */
  [ThemeColorEnum.WARNING]: string;
  /**
   * @description 错误色
   * @description Error color
   */
  [ThemeColorEnum.ERROR]: string;
}

export interface ThemeSetting {
  colors: ThemeSettingColors;
}

export interface HeaderSetting {
  // 头部显示
  // Header show
  show: boolean;
  // 头部高度
  // Header height
  height: number;
  // 是否显示面包屑
  // Whether to show breadcrumbs
  showBreadCrumb: boolean;
  // 是否显示面包屑图标
  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: boolean;
}

export interface FooterSetting {
  // 底部显示
  // Footer show
  show: boolean;
  // 底部高度
  // Footer height
  height: number;
  // 是否固定底部
  // Fixed at the bottom
  fixed: boolean;
}

export interface ThemeInfo {
  // 作者
  // Author
  author: string;
  // logo
  logo?: string;
  // 主题名称
  // Theme name
  themeName: string;
  // 描述
  // Description
  description?: string;
  // 包名
  // Package name
  packageName: string;
  // 依赖库
  // Dependent library
  depLibrary: string;
  // 颜色
  // Colors
  colors: ThemeSettingColors;
}

export interface ProjectConfig {
  // TODO: 感觉没有必要，用户信息不大可能会存储在sessionStorage，不过还是暂时保留
  // 权限相关信息的存储位置
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  // 显示错误处理插件
  // Use error-handler-plugin
  useErrorHandle: boolean;
  // 动画配置
  // Animation configuration
  transitionSetting: TransitionSetting;
  // 页面布局是否开启keep-alive
  // pageLayout whether to enable keep-alive
  openKeepAlive: boolean;

  // 是否固定头部和标签
  // Whether to fix the header and tab
  fixedHeaderAndTab: boolean;

  // 内容页面是否可以滚动
  // Whether the content page can scroll
  contentXScrollable: boolean;

  // 布局设置
  // Layout settings
  layoutSetting: LayoutSetting;

  // 多标签页设置
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;

  // 菜单设置
  // menuSetting
  menuSetting: MenuSetting;

  // 主题设置
  // Theme setting
  themeSetting: ThemeSetting;
  // 换肤设置
  // Skin setting
  themeProSetting: ThemeInfo | null;
  // 灰色模式
  // Gray mode
  grayMode: boolean;
  // 弱色模式
  // Weak mode
  colorWeak: boolean;

  // 头部设置
  // Header setting
  headerSetting: HeaderSetting;
  // 底部设置
  // Footer setting
  footerSetting: FooterSetting;

  // 显示logo
  // Show logo
  showLogo: boolean;

  // 切换接口时是否取消已发送但未响应的http请求
  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;

  // 会话超时处理
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;

  // 是否显示全屏
  // Whether to show the full screen
  fullContent: boolean;

  // 是否显示配置按钮
  // Whether to show the configuration button
  showSettingButton: boolean;
  // 是否显示主题切换按钮 TODO：暂时没用
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // 配置按钮显示位置
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum;

  // 权限模式
  // Permission mode
  permissionMode: PermissionModeEnum;
}
