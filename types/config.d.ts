import { CacheTypeEnum } from '@/enums';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

// TODO: 可能需要修改
export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
  // Site title
  VITE_GLOB_APP_TITLE_SHORT?: string;
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

export interface ProjectConfig {
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
}
