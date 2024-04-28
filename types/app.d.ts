import { RouteMeta } from 'vue-router';

declare namespace App {
  import RoutePath = AuthRoute.RoutePath;

  /**
   * @description The global header props
   * @description 全局头部属性
   */
  interface Header {
    /** Whether to show the logo */
    showLogo?: boolean;
    /** Whether to show the menu toggle */
    showMenuToggle?: boolean;
    /** Whether to show the menu */
    showMenu?: boolean;
  }

  type Menu = {
    /**
     * Menu icon
     * 菜单图标
     */
    icon?: import('vue').VNode;
    /**
     * Menu route name, the unique identifier of the route
     * 路由名称，路由的唯一标识
     */
    routeName: AuthRoute.RouteKey;
    /**
     * Menu route path
     * 路由路径 dashboard_analysis => /dashboard/analysis
     */
    routePath: AuthRoute.RoutePath;
    /**
     * Menu children
     * 菜单子项
     */
    children?: Menu[];
    /**
     *
     */
    meta?: RouteMeta<RoutePath<K>>;
  };

  type Breadcrumb = {
    /**
     * Menu icon
     * 菜单图标
     */
    icon?: import('vue').VNode;
    /**
     * Menu route name, the unique identifier of the route
     * 路由名称，路由的唯一标识
     */
    routeName: AuthRoute.RouteKey;
    /**
     * Menu route path
     * 路由路径 dashboard_analysis => /dashboard/analysis
     */
    routePath: AuthRoute.RoutePath;
    /**
     * Whether to disable breadcrumbs
     * 是否禁用面包屑
     */
    disabled?: boolean;
    /**
     * Menu children
     * 菜单子项
     */
    children?: Menu[];
    /**
     *
     */
    meta?: RouteMeta<RoutePath<K>>;
  };

  interface Tab
    extends Pick<
      import('vue-router').RouteLocationNormalized,
      'name' | 'meta' | 'fullPath' | 'query' | 'params'
    > {
    /** 滚动的位置 */
    scrollPosition: {
      left: number;
      top: number;
    };
  }
}
