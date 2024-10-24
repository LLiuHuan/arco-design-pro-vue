import type { ProjectConfig } from '~/types/config';
import {
  AppEnum,
  CacheTypeEnum,
  MenuModeEnum,
  MixSidebarTriggerEnum,
  PermissionModeEnum,
  RouterTransitionEnum,
  SessionTimeoutProcessingEnum,
  SettingButtonPositionEnum,
  ThemeColorEnum,
  TriggerEnum,
} from '@/enums';
import jsonSetting from './projectSetting.json';

export const defaultSetting: ProjectConfig = {
  settingButtonPosition: SettingButtonPositionEnum.AUTO,
  // Permission-related cache is stored in sessionStorage or localStorage - [权限相关缓存存储在sessionStorage还是localStorage中]
  permissionCacheType: CacheTypeEnum.LOCAL,
  // Use error-handler-plugin - [显示错误处理插件]
  useErrorHandle: true,
  // Whether to show the configuration button
  // 是否显示配置按钮
  showSettingButton: true,
  // Whether to show the theme switch button
  // 是否显示主题切换按钮
  showDarkModeToggle: true,
  // Whether to display the logo - [是否显示Logo]
  showLogo: true,
  // 是否固定头部和标签
  // Whether to fix the header and tab
  fixedHeaderAndTab: true,
  // 卡片圆角
  // Card radius
  borderRadius: 0,
  // Animation configuration - [动画配置]
  transitionSetting: {
    // Whether to open the page switching animation - [是否开启页面切换动画]
    // The disabled state will also disable pageLoading - [禁用状态也会禁用pageLoading]
    enable: true,

    // Route basic switching animation - [路由基本切换动画]
    basicTransition: RouterTransitionEnum.FADE_SLIDE,

    // Whether to open page switching loading - [是否开启页面切换loading]
    // Only open when enable=true - [只有在enable=true时才会打开]
    openPageLoading: true,

    // Whether to open the top progress bar - [是否开启顶部进度条]
    openNProgress: true,
  },
  // pageLayout whether to enable keep-alive - [页面布局是否开启keep-alive]
  openKeepAlive: true,
  // // Is it possible to embed iframe pages - [是否可以嵌入iframe页面]
  // canEmbedIFramePage: true,
  // Multi-tab settings - [多标签页设置]
  multiTabsSetting: {
    cache: true,
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
    autoCollapse: true,
    // tab 高度
    // Tab height
    height: 48,
  },
  layoutSetting: {
    // Menu mode
    // 菜单模式
    mode: MenuModeEnum.VERTICAL_MIX,
    // 滚动模式
    // Scroll mode
    // scrollMode: 'content',
    scrollMode: 'wrapper',
    // 反转数据
    // 为HORIZONTAL_MIX提供，在HORIZONTAL_MIX的时候可以顶部一级菜单，子菜单显示在左侧
    // Reverse data
    // Provided for HORIZONTAL_MIX, in HORIZONTAL_MIX can be the top level menu, submenu is displayed on the left side of the
    reverse: false,
  },
  // Menu settings - [菜单设置]
  menuSetting: {
    // Whether the menu is collapsed
    // 菜单是否折叠
    collapsed: false,
    // Background color
    // 背景颜色
    bgColor: '#304156',
    // 菜单宽度
    // Menu width
    menuWidth: 210,
    // 菜单折叠宽度
    // Menu collapse width
    collapsedMenuWidth: 48,
    // 混合菜单宽度
    // Mix menu width
    mixMenuWidth: 80,
    // 混合菜单折叠宽度
    // Mix menu collapse width
    mixCollapsedMenuWidth: 48,
    // 混合菜单子宽度
    // Mix menu child width
    mixChildMenuWidth: 210,
    // Whether the sidebar is hidden
    // 侧边栏是否隐藏
    siderHidden: false,
    // Menu collapse trigger position
    // 菜单折叠触发器位置
    trigger: TriggerEnum.HEADER,
    // Drag the sidebar
    // 拖动侧边栏
    canDrag: true,
    // Menu theme
    // 菜单主题
    theme: AppEnum.LIGHT,
    // Whether to enable handover
    // 是否开启手风琴模式
    accordion: true,

    // 混合菜单是否固定
    // Is the mixed menu fixed?
    mixSideFixed: false,

    // 混合菜单触发器位置
    // Mixed menu trigger position
    mixSideTrigger: MixSidebarTriggerEnum.HOVER,

    // 选中菜单后是否关闭混合菜单
    // Whether to close the mixed menu after selecting the menu
    closeMixSidebarOnChange: true,
  },
  // Theme settings - [主题设置]
  themeSetting: {
    colors: {
      // 信息色
      // Primary color
      [ThemeColorEnum.PRIMARY]: '#165DFF',
      // 成功色
      // Success color
      [ThemeColorEnum.SUCCESS]: '#00B42A',
      // 警告色
      // Warning color
      [ThemeColorEnum.WARNING]: '#FF7D00',
      // 错误色
      // Error color
      [ThemeColorEnum.ERROR]: '#F53F3F',
    },
  },
  // 灰色模式
  // Gray mode
  grayMode: false,
  // 色弱模式
  // Weak mode
  colorWeak: false,
  // Header settings - [头部设置]
  headerSetting: {
    // Whether to display - [是否显示]
    show: true,
    // Header height - [头部高度]
    height: 64,
    // Whether to show breadcrumbs - [是否显示面包屑]
    showBreadCrumb: true,
    // Whether to show the breadcrumb icon - [是否显示面包屑图标]
    showBreadCrumbIcon: true,
  },

  footerSetting: {
    // 是否显示
    // Whether to display
    show: true,
    // 底部高度
    // Footer height
    height: 48,
    // 是否固定底部
    // Whether to fix the bottom
    fixed: false,
  },

  // Whether to cancel the http request that has been sent but not responded when switching the interface
  // 切换界面时取消未响应的http请求
  removeAllHttpPending: false,
  // Session timeout processing
  // 会话超时处理
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP,
  // Whether to full screen display - [是否开启全屏显示]
  fullContent: false,

  permissionMode: PermissionModeEnum.ROLE,
  themeProSetting: null,
  contentXScrollable: false,

  // 是否打开水印
  // Whether to open the watermark
  watermark: false,
  // 水印文本
  // Watermark text
  watermarkText: 'Arco Vue3',
  // 版权信息
  // Copyright
  copyrightSetting: {
    show: false,
    company: 'Arco Vue3',
  },
};

export const appSetting: ProjectConfig = {
  ...defaultSetting,
  ...(jsonSetting as ProjectConfig),
};
