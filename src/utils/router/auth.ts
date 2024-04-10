import { RoleEnum } from '@/enums/authEnum';

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param roles - 权限
 */
function filterAuthRouteByUserPermission(
  route: AuthRoute.Route,
  roles: string[],
): AuthRoute.Route[] {
  const routeFilter = (routeItem: AuthRoute.Route) => {
    const { meta } = routeItem;

    const { roles: ruleList } = meta || {};
    if (!ruleList) return true;
    if (ruleList.includes(RoleEnum.SUPER)) return true;

    return ruleList.some((role) => ruleList.includes(role));
  };

  const filterRoute = { ...route };
  const hasPermission = routeFilter(filterRoute);

  if (filterRoute.children) {
    const filterChildren = filterRoute.children
      .map((item) => filterAuthRouteByUserPermission(item, roles))
      .flat(1);
    Object.assign(filterRoute, { children: filterChildren });
  }
  return hasPermission ? [filterRoute] : [];
}

/**
 * 根据用户权限过滤路由
 * @param routes - 权限路由
 * @param permission - 权限
 */
export function filterAuthRoutesByUserPermission(
  routes: AuthRoute.Route[],
  permission: string[],
) {
  return routes
    .map((route) => filterAuthRouteByUserPermission(route, permission))
    .flat(1);
}
