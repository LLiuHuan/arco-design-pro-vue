import {
  CacheTypeEnum,
  MenuTypeEnum,
  RouterTransitionEnum,
  ThemeColorEnum,
  ThemeEnum,
  TriggerEnum,
} from '@/enums';
import type { ArcoLang } from '@arco-design/web-vue/es/locale/interface';

export type LocaleType = 'zh-CN' | 'en-US'; // | 'ja-JP' | 'ko-KR'

// TODO: 可能需要修改
export interface GlobEnvConfig {
  // 项目标题，用于显示在浏览器标签和站点标题
  title: string;
  // 项目地址
  apiUrl: string;
  // 项目地址前缀
  apiUrlPrefix?: string;
  // 上传地址
  uploadUrl?: string;
  // 项目标题简称
  shortTitle?: string;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language - [当前语言]
  locale: LocaleType;
  // default language - [默认语言]
  fallback: LocaleType;
  // available Locales - [可用语言]
  availableLocales: LocaleType[];
  // arco language - [arco语言]
  arcoLang?: ArcoLang;
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
  type: MenuTypeEnum;
  // Background color - [背景颜色]
  bgColor: string;
  // Whether to collapse the menu - [是否折叠菜单]
  collapsed?: boolean;
  // Menu width - [菜单宽度]
  menuWidth: number;
  // Whether the sidebar is hidden - [侧边栏是否隐藏]
  siderHidden?: boolean;
  // Menu theme - [菜单主题]
  theme: ThemeEnum;

  // Menu collapse trigger position - [菜单折叠触发器位置]
  trigger: TriggerEnum;
  // Drag the sidebar - [拖动侧边栏]
  canDrag: boolean;
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

  // menuSetting - [菜单设置]
  menuSetting: MenuSetting;

  // Theme setting - [主题设置]
  themeSetting: ThemeSetting;
}
