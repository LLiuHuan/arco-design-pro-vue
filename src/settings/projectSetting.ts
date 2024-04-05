import type { ProjectConfig } from '~/types/config';
import {
  CacheTypeEnum,
  MenuTypeEnum,
  RouterTransitionEnum,
  ThemeColorEnum,
  ThemeEnum,
  TriggerEnum,
} from '@/enums';
import jsonSetting from './projectSetting.json';

const defaultSetting: ProjectConfig = {
  // Permission-related cache is stored in sessionStorage or localStorage - [权限相关缓存存储在sessionStorage还是localStorage中]
  permissionCacheType: CacheTypeEnum.LOCAL,
  // Use error-handler-plugin - [显示错误处理插件]
  useErrorHandle: false,
  // Whether to display the logo - [是否显示Logo]
  showLogo: true,
  // Animation configuration - [动画配置]
  transitionSetting: {
    // Whether to open the page switching animation - [是否开启页面切换动画]
    // The disabled state will also disable pageLoading - [禁用状态也会禁用pageLoading]
    enable: true,

    // Route basic switching animation - [路由基本切换动画]
    basicTransition: RouterTransitionEnum.FADE_SIDE,

    // Whether to open page switching loading - [是否开启页面切换loading]
    // Only open when enable=true - [只有在enable=true时才会打开]
    openPageLoading: true,

    // Whether to open the top progress bar - [是否开启顶部进度条]
    openNProgress: false,
  },
  // pageLayout whether to enable keep-alive - [页面布局是否开启keep-alive]
  openKeepAlive: true,
  // Is it possible to embed iframe pages - [是否可以嵌入iframe页面]
  canEmbedIFramePage: true,
  // Multi-tab settings - [多标签页设置]
  multiTabsSetting: {
    cache: false,
    // Turn on - [是否开启]
    show: true,
    // Is it possible to drag and drop sorting tabs - [是否可以拖拽排序tab]
    canDrag: true,
    // Turn on quick actions - [是否开启快速操作]
    showQuick: true,
    // Whether to show the refresh button - [是否显示刷新按钮]
    showRedo: true,
    // Whether to show the collapse button - [是否显示折叠按钮]
    showFold: true,
    // Auto collapsed - [自动折叠]
    autoCollapse: false,
  },
  // Menu settings - [菜单设置]
  menuSetting: {
    // Whether the menu is collapsed - [菜单是否折叠]
    collapsed: false,
    // Background color - [背景颜色]
    bgColor: '#304156',
    // Menu width - [菜单宽度]
    menuWidth: 210,
    // Whether the sidebar is hidden - [侧边栏是否隐藏]
    siderHidden: false,
    // Menu collapse trigger position - [菜单折叠触发器位置]
    trigger: TriggerEnum.HEADER,
    // Drag the sidebar - [拖动侧边栏]
    canDrag: true,
    // Menu theme - [菜单主题]
    theme: ThemeEnum.LIGHT,
    // Whether to enable handover - [是否开启手风琴模式]
    accordion: true,

    // Menu type - [菜单类型]
    type: MenuTypeEnum.SIDEBAR,
  },
  // Theme settings - [主题设置]
  themeSetting: {
    // Theme color - [主题色]
    [ThemeColorEnum.PRIMARY]: '#165DFF',
    // Success color - [成功色]
    [ThemeColorEnum.SUCCESS]: '#00B42A',
    // Warning color - [警告色]
    [ThemeColorEnum.WARNING]: '#FF7D00',
    // Error color - [错误色]
    [ThemeColorEnum.ERROR]: '#F53F3F',
  },
  // Header settings - [头部设置]
  headerSetting: {
    // Header height - [头部高度]
    height: 64,
  },
};

export const appSetting = { ...defaultSetting, ...jsonSetting };
