import { router } from '@/router';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { CONSTANT_ROUTES } from '@/router/routes';
import { transformAuthRouteToVueRoutes } from '@/router/helper/transform';

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });

const basicRoutes = transformAuthRouteToVueRoutes(CONSTANT_ROUTES);
getRouteNames(basicRoutes);
/**
 * @description Reset routes data, keep constant routes - [重置路由数据，保留固定路由]
 */
export const resetRoutes = () => {
  const { isConstantRoute } = useRouteStoreWithOut();
  const routes = router.getRoutes();
  routes.forEach((route) => {
    const name = (route.name || 'root') as AuthRoute.AllRouteKey;
    if (!isConstantRoute(name)) {
      router.removeRoute(name);
    }
  });
};

/**
 * @description Reset route - [重置路由]
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      if (router.hasRoute(name)) router.removeRoute(name);
    }
  });
}
