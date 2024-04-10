import { transformRouteNameToRoutePath } from './transform';

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name];
  if (route.children?.length) {
    names.push(
      ...route.children!.map((item) => getConstantRouteName(item)).flat(1),
    );
  }
  return names;
}

/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.map((route) => getConstantRouteName(route)).flat(1);
}

/** 路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => key;
/** 路由路径 */
export const routePath = (key: Exclude<AuthRoute.RouteKey, 'not-found'>) =>
  transformRouteNameToRoutePath(key);
