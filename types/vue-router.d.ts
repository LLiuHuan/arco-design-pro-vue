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
  }
}
