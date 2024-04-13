export {};

declare module 'vue-router' {
  interface RouteMeta
    extends Record<string | number | symbol, unknown | RouteMeta> {
    /**
     * Route name
     * 路由名称
     */
    title: string;
    /**
     * Route internationalized name
     * 路由国际化名称
     */
    i18nTitle?: string;

    /** 外链链接 */
    href?: string;
    /**
     * Whether to ignore permissions
     * 是否忽略权限
     */
    ignoreAuth?: boolean;
    /**
     * Which types of users have permission to access the route
     * 哪些类型的用户有权限才能访问的路由
     */
    roles?: string[];
    /**
     * Menu items that need to be selected for the current route
     * 当前路由需要选中的菜单项
     */
    currentActiveMenu?: string;

    // Never show in tab
    hideTab?: boolean;
    dynamicLevel?: number;
    /** 是否固定在tab卡不可关闭  */
    affix?: boolean;
  }
}
