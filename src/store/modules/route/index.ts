import { defineStore } from 'pinia';
import { constantRoutes, router, routes as staticRoutes } from '@/router';
import {
  filterAuthRoutesByUserPermission,
  getCacheRoutes,
  getConstantRouteNames,
  getUserInfo,
  transformAuthRoutesToSearchMenus,
  transformAuthRoutesToVueRoutes,
  transformAuthRouteToMenu,
  transformRoutePathToRouteName,
} from '@/utils';
import { fetchUserRoutes } from '@/api';
import { useAuthStore } from '../auth';
import { useTabStore } from '../tab';

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
  routeHomeName: AuthRoute.RouteKey;
  /** 菜单 */
  menus: GlobalMenuOption[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore('route-store', {
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(import.meta.env.VITE_ROUTE_HOME_PATH),
    menus: [],
    searchMenus: [],
    cacheRoutes: [],
  }),
  actions: {
    resetRouteStore() {
      this.resetRoutes();
      this.$reset();
    },
    /** 重置路由数据，保留固定路由 */
    resetRoutes() {
      const routes = router.getRoutes();
      const constantRouteNames = getConstantRouteNames(constantRoutes);
      routes.forEach((route) => {
        const name: AuthRoute.RouteKey = (route.name || 'root') as AuthRoute.RouteKey;
        if (!constantRouteNames.includes(name)) {
          router.removeRoute(name);
        }
      });
    },
    /**
     * 处理权限路由
     * @param routes - 权限路由
     */
    handleAuthRoutes(routes: AuthRoute.Route[]) {
      this.menus = transformAuthRouteToMenu(routes);
      console.log(this.menus);
      this.searchMenus = transformAuthRoutesToSearchMenus(routes);

      const vueRoutes = transformAuthRoutesToVueRoutes(routes);
      console.log(vueRoutes);
      vueRoutes.forEach((route) => {
        router.addRoute(route);
      });
      console.log(router);
      this.cacheRoutes = getCacheRoutes(vueRoutes);
    },
    /** 初始化动态路由 */
    async initDynamicRoute() {
      const { userId } = getUserInfo();
      const data = await fetchUserRoutes(userId);
      console.log('data: ', data);
      if (data) {
        this.routeHomeName = data.home;
        this.handleAuthRoutes(data.routes);
      }
    },
    /** 初始化静态路由 */
    async initStaticRoute() {
      const auth = useAuthStore();
      const routes = filterAuthRoutesByUserPermission(staticRoutes, auth.userInfo.userRole);
      this.handleAuthRoutes(routes);
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      const { initHomeTab } = useTabStore();
      const { userId } = getUserInfo();

      if (!userId) return;

      const isDynamicRoute = this.authRouteMode === 'dynamic';
      console.log(isDynamicRoute);
      if (isDynamicRoute) {
        await this.initDynamicRoute();
      } else {
        await this.initStaticRoute();
      }

      initHomeTab(this.routeHomeName, router);

      this.isInitAuthRoute = true;
    },
  },
});
