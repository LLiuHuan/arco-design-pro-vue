/**
 * @description 头部配置
 * @description Header config
 */
interface AdminLayoutHeaderConfig {
  /**
   * @description 头部是否可见
   * @description Whether header is visible
   *
   * @default true
   */
  headerVisible?: boolean;
  /**
   * @description 头部类名
   * @description Header class
   *
   * @default ''
   */
  headerClass?: string;
  /**
   * @description 头部高度
   * @description Header height
   *
   * @default 56px
   */
  headerHeight?: number;
}

/**
 * @description 标签配置
 * @description Tab config
 */
interface AdminLayoutTabConfig {
  /**
   * @description 标签是否可见
   * @description Whether tab is visible
   *
   * @default true
   */
  tabVisible?: boolean;
  /**
   * @description 标签类名
   * @description Tab class
   *
   * @default ''
   */
  tabClass?: string;
  /**
   * @description 标签高度
   * @description Tab height
   *
   * @default 48px
   */
  tabHeight?: number;

  /**
   * @description 全屏时标签是否自动隐藏
   * @description Whether the tab is automatically hidden when full screen
   *
   * @default false
   */
  tabAutoCollapse?: boolean;
}

/**
 * @description 侧边栏配置
 * @description Sider config
 */
interface AdminLayoutSiderConfig {
  /**
   * @description 侧边栏是否可见
   * @description Whether sider is visible
   *
   * @default true
   */
  siderVisible?: boolean;
  /**
   * @description 侧边栏类名
   * @description Sider class
   *
   * @default ''
   */
  siderClass?: string;
  /**
   * @description 移动端侧边栏类名
   * @description Mobile sider class
   *
   * @default ''
   */
  mobileSiderClass?: string;
  /**
   * @description 侧边栏折叠状态
   * @description Sider collapse status
   *
   * @default false
   */
  siderCollapse?: boolean;
  /**
   * @description 侧边栏折叠时的宽度
   * @description Sider width when collapse is false
   *
   * @default '220px'
   */
  siderWidth?: number;
  /**
   * @description 侧边栏展开时的宽度
   * @description Sider width when collapse is true
   *
   * @default '64px'
   */
  siderCollapsedWidth?: number;
}

/**
 * @description 内容配置
 * @description Content config
 */
export interface AdminLayoutContentConfig {
  /**
   * @description 内容类名
   * @description Content class
   *
   * @default ''
   */
  contentClass?: string;
  /**
   * @description 内容是否占满页面
   * @description Whether content is full the page
   *
   * 如果为 true，则其他元素将被 `display: none` 隐藏
   * If true, other elements will be hidden by `display: none`
   */
  fullContent?: boolean;
}

/**
 * @description 底部配置
 * @description Footer config
 */
export interface AdminLayoutFooterConfig {
  /**
   * @description 底部是否可见
   * @description Whether footer is visible
   *
   * @default true
   */
  footerVisible?: boolean;
  /**
   * @description 底部是否固定
   * @description Whether footer is fixed
   *
   * @default true
   */
  fixedFooter?: boolean;
  /**
   * @description 底部类名
   * @description Footer class
   *
   * @default ''
   */
  footerClass?: string;
  /**
   * @description 底部高度
   * @description Footer height
   *
   * @default 48px
   */
  footerHeight?: number;
  /**
   * @description 底部是否在右侧
   * @description Whether footer is on the right side
   *
   * 当布局为垂直时，底部在右侧
   * When the layout is vertical, the footer is on the right side
   */
  rightFooter?: boolean;
}

/**
 * @description 布局模式
 * @description Layout mode
 *
 * - Horizontal
 * - Vertical
 */
export type LayoutMode = 'horizontal' | 'vertical';

/**
 * @description 内容溢出时的滚动模式
 * @description The scroll mode when content overflow
 *
 * - 布局组件的包装器元素有滚动条
 * - 布局组件的内容元素有滚动条
 *
 * - Wrapper: the layout component's wrapper element has a scrollbar
 * - Content: the layout component's content element has a scrollbar
 *
 * @default 'wrapper'
 */
export type LayoutScrollMode = 'wrapper' | 'content';

/**
 * @description 布局属性
 * @description Admin layout props
 * */
export interface AdminLayoutProps
  extends AdminLayoutHeaderConfig,
    AdminLayoutTabConfig,
    AdminLayoutSiderConfig,
    AdminLayoutContentConfig,
    AdminLayoutFooterConfig {
  /**
   * @description 布局模式
   * @description Layout mode
   *
   * - {@link LayoutMode}
   */
  mode?: LayoutMode;
  /**
   * @description 是否是移动端
   * @description Whether is mobile
   */
  isMobile?: boolean;
  /**
   * @description 滚动模式
   * @description Scroll mode
   *
   * - Wrapper: the layout component's wrapper element has a scrollbar
   * - Content: the layout component's content element has a scrollbar
   *
   * - {@link LayoutScrollMode}
   */
  scrollMode?: LayoutScrollMode;
  /**
   * @description 布局的滚动元素的 id
   * @description The id of the scroll element of the layout
   *
   * 可以用来获取相应的 Dom 并滚动它
   * It can be used to get the corresponding Dom and scroll it
   *
   * @example
   *   use the default id by import
   *   ```ts
   *   import { adminLayoutScrollElId } from '@sa/vue-materials';
   *   ```
   *
   * @default
   * ```ts
   * const adminLayoutScrollElId = '__ADMIN_LAYOUT_SCROLL_EL_ID__'
   * ```
   */
  scrollElId?: string;
  /**
   * @description 滚动元素的类名
   * @description The class of the scroll element
   */
  scrollElClass?: string;
  /**
   * @description 滚动包装器元素的类名
   * @description The class of the scroll wrapper element
   */
  scrollWrapperClass?: string;
  /**
   * @description 布局的通用类名
   * @description The common class of the layout
   *
   * 可以用来配置过渡动画
   * Is can be used to configure the transition animation
   *
   * @default 'transition-base'
   */
  commonClass?: string;
  /**
   * @description 是否固定头部和标签
   * @description Whether fix the header and tab
   *
   * @default true
   */
  fixedTop?: boolean;
  /**
   * @description 布局的最大 z-index
   * @description The max z-index of the layout
   *
   * 头部、标签、侧边栏和底部的 z-index 不会超过这个值
   * The z-index of Header,Tab,Sider and Footer will not exceed this value
   */
  maxZIndex?: number;
}

type Kebab<S extends string> =
  S extends Uncapitalize<S> ? S : `-${Uncapitalize<S>}`;

type KebabCase<S extends string> = S extends `${infer Start}${infer End}`
  ? `${Uncapitalize<Start>}${KebabCase<Kebab<End>>}`
  : S;

type Prefix = '--adp-';

export type LayoutCssVarsProps = Pick<
  AdminLayoutProps,
  | 'headerHeight'
  | 'tabHeight'
  | 'siderWidth'
  | 'siderCollapsedWidth'
  | 'footerHeight'
> & {
  headerZIndex?: number;
  tabZIndex?: number;
  siderZIndex?: number;
  mobileSiderZIndex?: number;
  footerZIndex?: number;
};

export type LayoutCssVars = {
  [K in keyof LayoutCssVarsProps as `${Prefix}${KebabCase<K>}`]:
    | string
    | number;
};

/**
 * @description 标签的模式
 * @description The mode of the tab
 *
 * - 按钮：按钮样式
 * - Button: button style
 *
 * @default button
 */
export type PageTabMode = 'button';

/**
 * @description 页面标签属性
 * @description Page tab props
 */
export interface PageTabProps {
  /**
   * @description 是否是暗黑模式
   * @description Whether is dark mode
   */
  darkMode?: boolean;
  /**
   * @description 标签的模式
   * @description The mode of the tab
   *
   * - {@link PageTabMode}
   */
  mode?: PageTabMode;
  /**
   * @description 布局的通用类名
   * @description The common class of the layout
   *
   * 可以用来配置过渡动画
   * Is can be used to configure the transition animation
   *
   * @default 'transition-base'
   */
  commonClass?: string;
  /**
   * @description 按钮标签的类名
   * @description The class of the button tab
   */
  buttonClass?: string;
  /**
   * @description 标签是否激活
   * @description Whether the tab is active
   */
  active?: boolean;
  /**
   * @description 激活标签的颜色
   * @description The color of the active tab
   */
  activeColor?: string;
  /**
   * @description 标签是否可关闭
   * @description Whether the tab is closable
   *
   * 当为 true 时显示关闭图标
   * Show the close icon when true
   */
  closable?: boolean;
}

/**
 * @description 页面标签 css 变量属性
 * @description Page tab css vars props
 */
export type PageTabCssVarsProps = {
  primaryColor: string;
  primaryColor1: string;
  primaryColor2: string;
  primaryColorOpacity1: string;
  primaryColorOpacity2: string;
  primaryColorOpacity3: string;
};

/**
 * @description 页面标签 css 变量
 * @description Page tab css vars
 */
export type PageTabCssVars = {
  [K in keyof PageTabCssVarsProps as `${Prefix}${KebabCase<K>}`]:
    | string
    | number;
};
