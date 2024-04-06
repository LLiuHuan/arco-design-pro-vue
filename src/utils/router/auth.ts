import { RoleEnum } from '@/enums/authEnum';

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

/**
 * 根据用户权限过滤单个路由
 * @param route - 单个权限路由
 * @param roles - 权限
 */
function filterAuthRouteByUserPermission(
  route: AuthRoute.Route,
  roles: string[],
): AuthRoute.Route[] {
  const routeFilter = (route: AuthRoute.Route) => {
    const { meta } = route;

    const { roles } = meta || {};
    if (!roles) return true;
    if (roles.includes(RoleEnum.SUPER)) return true;

    return roles.some((role) => roles.includes(role));
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
