import { defineStore } from 'pinia';
import { router, CONSTANT_ROUTES, routes as staticRoutes } from '@/router';
import { useAuthStore } from '@/store/modules/auth';
import {
  filterAuthRoutesByUserPermission,
  getConstantRouteNames,
  transformAuthRouteToVueRoutes,
  transformRoutePathToRouteName,
} from '@/utils/router';

interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: AuthRoute.AllRouteKey;
  // /** 菜单 */
  // menus: App.GlobalMenuOption[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore({
  id: 'route-store',
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(
      import.meta.env.VITE_ROUTE_HOME_PATH,
    ),
    // menus: [],
    searchMenus: [],
    cacheRoutes: [],
  }),
  getters: {},
  actions: {
    /**
     * @description Reset the store of the route - [重置路由的store]
     */
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /**
     * @description Reset routes data, keep constant routes - [重置路由数据，保留固定路由]
     */
    resetRoutes() {
      const routes = router.getRoutes();
      routes.forEach((route) => {
        const name = (route.name || 'root') as AuthRoute.AllRouteKey;
        if (!this.isConstantRoute(name)) {
          router.removeRoute(name);
        }
      });
    },
    /**
     * @description Whether it is a constant route - [是否是固定路由]
     * @param name 路由名称
     */
    isConstantRoute(name: AuthRoute.AllRouteKey) {
      const constantRouteNames = getConstantRouteNames(CONSTANT_ROUTES);
      return constantRouteNames.includes(name);
    },

    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoute(routes: AuthRoute.Route[]) {
      // (this.menus as App.GlobalMenuOption[]) = transformAuthRouteToMenu(routes);
      // this.searchMenus = transformAuthRouteToSearchMenus(routes);

      const vueRoutes = transformAuthRouteToVueRoutes(routes);

      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });

      // this.cacheRoutes = getCacheRoutes(vueRoutes);
    },

    /**
     * @description Initialize the static route - [初始化静态路由]
     */
    async initStaticRoute() {
      // const { initHomeTab } = useMultipleTabStore();
      const auth = useAuthStore();

      const routes = filterAuthRoutesByUserPermission(
        staticRoutes,
        auth.userInfo.userRole,
      );
      this.handleAuthRoute(routes);

      // initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    },
    /**
     * @description Initialize the authentication route - [初始化权限路由]
     */
    async initAuthRoute() {
      if (this.authRouteMode === 'dynamic') {
        // await this.initDynamicRoute();
      } else {
        await this.initStaticRoute();
      }
    },
  },
});
