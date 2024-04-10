import { useRouteStoreWithOut } from '@/store/modules/route';
import { useAuthStore } from '@/store/modules/auth';
import {
  filterAuthRoutesByUserPermission,
  getCacheRoutes,
  transformAuthRouteToSearchMenus,
  transformAuthRouteToVueRoutes,
} from '@/utils/router';
import { routes as staticRoutes } from '@/router/modules';
import { transformAuthRouteToMenu } from '@/utils/router/menu';
import { router } from '@/router';

export const useRoute = () => {
  const routeStore = useRouteStoreWithOut();

  /**
   * 处理权限路由
   * @param routes - 权限路由
   */
  const handleAuthRoute = (routes: AuthRoute.Route[]) => {
    const menus = transformAuthRouteToMenu(routes);
    const searchMenus = transformAuthRouteToSearchMenus(routes);
    const vueRoutes = transformAuthRouteToVueRoutes(routes);
    console.log('vueRoutes:', vueRoutes);
    vueRoutes.forEach((route) => {
      router.addRoute(route);
    });
    const cacheRoutes = getCacheRoutes(vueRoutes);

    routeStore.setMenus(menus);
    routeStore.setSearchMenus(searchMenus);
    routeStore.setCacheRoutes(cacheRoutes);
  };

  /**
   * @description Initialize the static route - [初始化静态路由]
   */
  const initStaticRoute = async () => {
    // const { initHomeTab } = useMultipleTabStore();
    const authStore = useAuthStore();

    const routes = filterAuthRoutesByUserPermission(
      staticRoutes,
      authStore.getRoleList,
    );

    handleAuthRoute(routes);

    // initHomeTab(this.routeHomeName, router);

    routeStore.setIsInitAuthRoute(true);
  };

  /**
   * @description Initialize the authentication route - [初始化权限路由]
   */
  const initAuthRoute = async () => {
    if (routeStore.authRouteMode === 'dynamic') {
      // await this.initDynamicRoute();
    } else {
      await initStaticRoute();
    }
  };

  return {
    initAuthRoute,
  };
};
