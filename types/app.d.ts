import { RouteMeta } from 'vue-router';

declare namespace App {
  import RoutePath = AuthRoute.RoutePath;

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
    // /**
    //  * Menu route params
    //  */
    // paramPath: string;
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
}
