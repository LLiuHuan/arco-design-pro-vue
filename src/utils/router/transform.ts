/**
 * @description Convert the route path to the route name - [将路由路径转换成路由名称]
 * @param path
 */
export function transformRoutePathToRouteName(path: AuthRoute.RoutePath) {
  if (path === '/') return 'root';
  const pathSplitMark = '/';
  const routeSplitMark = '_';
  return path
    .split(pathSplitMark)
    .slice(1)
    .join(routeSplitMark) as AuthRoute.AllRouteKey;
}

/**
 * @description Convert the route name to the route path - [将路由名字转换成路由路径]
 * @param name
 */
export function transformRouteNameToRoutePath(
  name: Exclude<AuthRoute.AllRouteKey, 'not-found'>,
): AuthRoute.RoutePath {
  const rootPath: AuthRoute.RoutePath = '/';
  if (name === 'root') return rootPath;

  const splitMark = '_';
  const pathSplitMark = '/';
  const path = name.split(splitMark).join(pathSplitMark);

  return (pathSplitMark + path) as AuthRoute.RoutePath;
}

/**
 * @description Convert the route name to the route path - [将路由名字中带参数的转换成路由参数]
 * @param name
 */
export const transformRouteNameToOption = (name: AuthRoute.AllRouteKey) => {
  const routeSplitMark = '_';
  const params: Record<string, string> = {};
  name
    .split(routeSplitMark)
    .filter((v: string) => v.startsWith(':'))
    .forEach((v: string) => {
      params[v.replaceAll(':', '')] = v;
    });

  return {
    params,
  };
};

/**
 * 将权限路由转换成搜索的菜单数据
 * @param routes - 权限路由
 * @param treeMap
 */
export function transformAuthRouteToSearchMenus(
  routes: AuthRoute.Route[],
  treeMap: AuthRoute.Route[] = [],
) {
  if (routes && routes.length === 0) return [];
  return routes.reduce((acc, cur) => {
    if (!cur.meta?.hideMenu) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformAuthRouteToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}
