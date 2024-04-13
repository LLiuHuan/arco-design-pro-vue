import {
  CacheTypeEnum,
  MenuTypeEnum,
  RouterTransitionEnum,
  ThemeColorEnum,
  AppEnum,
  TriggerEnum,
  SessionTimeoutProcessingEnum,
  MenuModeEnum,
  SettingButtonPositionEnum,
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
  // Current language - [当前语言]
  locale: LocaleType;
  // default language - [默认语言]
  fallback: LocaleType;
  // available Locales - [可用语言]
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  Whether to open the page switching animation - [是否开启页面切换动画]
  enable: boolean;
  // Route basic switching animation - [路由基本切换动画]
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading - [是否开启页面切换loading]
  openPageLoading: boolean;
  // Whether to open the top progress bar - [是否开启顶部进度条]
  openNProgress: boolean;
}

export interface MultiTabsSetting {
  // Whether to enable tab - [是否开启tab]
  cache: boolean;
  // Whether to display tab - [是否显示tab]
  show: boolean;
  // Whether to display the quick button - [是否显示快捷按钮]
  showQuick: boolean;
  // Whether to allow drag and drop - [是否允许拖拽]
  canDrag: boolean;
  // Whether to display the redo button - [是否显示重做按钮]
  showRedo: boolean;
  // Whether to display the fold button - [是否显示折叠按钮]
  showFold: boolean;
  // Whether to automatically collapse - [是否自动折叠]
  autoCollapse: boolean;
}

export interface MenuSetting {
  // Menu type - [菜单类型]
  type: MenuTypeEnum;
  // Menu mode - [菜单模式]
  mode: MenuModeEnum;
  // Background color - [背景颜色]
  bgColor: string;
  // Whether to collapse the menu - [是否折叠菜单]
  collapsed?: boolean;
  // Menu width - [菜单宽度]
  menuWidth: number;
  // Whether the sidebar is hidden - [侧边栏是否隐藏]
  siderHidden?: boolean;
  // Menu theme - [菜单主题]
  theme: AppEnum;
  // Whether to enable handover - [是否开启手风琴模式]
  accordion: boolean;

  // Menu collapse trigger position - [菜单折叠触发器位置]
  trigger: TriggerEnum;
  // Drag the sidebar - [拖动侧边栏]
  canDrag: boolean;
  // 是否显示菜单
  show: boolean;
}

export interface ThemeSetting {
  /**
   * @description Theme color - [主题色]
   */
  [ThemeColorEnum.PRIMARY]: string;
  /**
   * @description Success color - [成功色]
   */
  [ThemeColorEnum.SUCCESS]: string;
  /**
   * @description Warning color - [警告色]
   */
  [ThemeColorEnum.WARNING]: string;
  /**
   * @description Error color - [错误色]
   */
  [ThemeColorEnum.ERROR]: string;
}

export interface HeaderSetting {
  // Header show - [头部显示]
  show: boolean;
  // Header height - [头部高度]
  height: number;
  // 是否显示面包屑
  // Whether to show breadcrumbs
  showBreadCrumb: boolean;
  // Whether to show the breadcrumb icon
  showBreadCrumbIcon: boolean;
}

export interface ProjectConfig {
  // TODO: 感觉没有必要，用户信息不大可能会存储在sessionStorage，不过还是暂时保留
  // Storage location of permission related information - [权限相关信息的存储位置]
  permissionCacheType: CacheTypeEnum;
  // Use error-handler-plugin - [显示错误处理插件]
  useErrorHandle: boolean;
  // Animation configuration - [动画配置]
  transitionSetting: TransitionSetting;
  // pageLayout whether to enable keep-alive - [页面布局是否开启keep-alive]
  openKeepAlive: boolean;
  // Is it possible to embed iframe pages - [是否可以嵌入iframe页面]
  canEmbedIFramePage: boolean;
  // Multi-tab settings - [多标签页设置]
  multiTabsSetting: MultiTabsSetting;

  // menuSetting - [菜单设置]
  menuSetting: MenuSetting;

  // Theme setting - [主题设置]
  themeSetting: ThemeSetting;

  // Header setting - [头部设置]
  headerSetting: HeaderSetting;

  // Show logo - [显示logo]
  showLogo: boolean;

  // Whether to cancel the http request that has been sent but not responded when switching the interface.
  // 切换接口时是否取消已发送但未响应的http请求
  removeAllHttpPending: boolean;

  // Session timeout processing
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;

  // Whether to show the full screen - [是否显示全屏]
  fullContent: boolean;

  // Whether to show the configuration button
  // 是否显示配置按钮
  showSettingButton: boolean;
  // Whether to show the theme switch button
  // 是否显示主题切换按钮
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  // 配置按钮显示位置
  settingButtonPosition: SettingButtonPositionEnum;
}
