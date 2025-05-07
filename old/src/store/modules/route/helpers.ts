import { RouteLocationNormalizedLoaded, RouteRecordRaw } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
import { iconRender } from '@/utils/common';
import type {
  ElegantConstRoute,
  LastLevelRouteKey,
  RouteKey,
  RoutePath,
} from '@elegant-router/types';

/**
 * @description 按角色过滤身份验证路由
 * @description Filter auth route by roles
 *
 * @param route Auth route
 * @param roles Roles
 */
function filterAuthRouteByRoles(route: ElegantConstRoute, roles: string[]) {
  const routeRoles = (route.meta && route.meta.roles) || [];

  // 如果路由的"roles"为空，则允许访问
  // if the route's "roles" is empty, then it is allowed to access
  const isEmptyRoles = !routeRoles.length;

  // 如果用户的角色包含在路由的"roles"中，则允许访问
  // if the user's role is included in the route's "roles", then it is allowed to access
  const hasPermission = routeRoles.some((role) => roles.includes(role));

  const filterRoute = { ...route };

  if (filterRoute.children?.length) {
    filterRoute.children = filterRoute.children.flatMap((item) =>
      filterAuthRouteByRoles(item, roles),
    );
  }

  return hasPermission || isEmptyRoles ? [filterRoute] : [];
}

/**
 * @description 按角色过滤身份验证路由
 * @description Filter auth routes by roles
 *
 * @param routes Auth routes
 * @param roles Roles
 */
export function filterAuthRoutesByRoles(
  routes: ElegantConstRoute[],
  roles: string[],
) {
  return routes.flatMap((route) => filterAuthRouteByRoles(route, roles));
}

/**
 * @description 基于基础路由获取全局菜单
 * @description Get global menu by route
 *
 * @param route
 */
function getGlobalMenuByBaseRoute(
  route: RouteLocationNormalizedLoaded | ElegantConstRoute,
) {
  const { name, path } = route;
  const {
    title,
    i18nKey,
    icon = import.meta.env.VITE_MENU_ICON,
    localIcon,
  } = route.meta ?? {};
  const { t } = useI18n();

  const label = i18nKey ? t(i18nKey) : (title ?? '');

  const menu: App.Menu = {
    key: name as string,
    label,
    i18nKey,
    routeKey: name as RouteKey,
    routePath: path as RoutePath,
    icon: iconRender({ icon, localIcon, fontSize: 20 }),
  };

  return menu;
}

/**
 * @description 基于权限路由获取全局菜单
 * @description Get global menus by auth routes
 *
 * @param routes Auth routes - [权限路由]
 */
export function getGlobalMenusByAuthRoutes(routes: ElegantConstRoute[]) {
  const menus: App.Menu[] = [];

  routes.forEach((route) => {
    if (!route.meta?.hideInMenu) {
      const menu = getGlobalMenuByBaseRoute(route);

      if (route.children?.some((child) => !child.meta?.hideInMenu)) {
        menu.children = getGlobalMenusByAuthRoutes(route.children);
      }

      menus.push(menu);
    }
  });

  return menus;
}

/**
 * @description 更新全局菜单的国际化
 * @description Update locale of global menus
 *
 * @param menus
 */
export function updateLocaleOfGlobalMenus(menus: App.Menu[]) {
  const result: App.Menu[] = [];

  menus.forEach((menu) => {
    const { i18nKey, label, children } = menu;
    const { t } = useI18n();

    const newLabel = i18nKey ? t(i18nKey) : label;

    const newMenu: App.Menu = {
      ...menu,
      label: newLabel,
    };

    if (children?.length) {
      newMenu.children = updateLocaleOfGlobalMenus(children);
    }

    result.push(newMenu);
  });

  return result;
}

/**
 * @description 获取缓存路由名称
 * @description Get cache route names
 *
 * @param routes Vue routes (two levels) - [Vue 路由]
 */
export function getCacheRouteNames(routes: RouteRecordRaw[]) {
  const cacheNames: LastLevelRouteKey[] = [];

  routes.forEach((route) => {
    // only get last two level route, which has component
    route.children?.forEach((child) => {
      if (child.component && child.meta?.keepAlive) {
        cacheNames.push(child.name as LastLevelRouteKey);
      }
    });
  });

  return cacheNames;
}

/**
 * @description 按顺序对路由进行排序
 * @description sort route by order
 *
 * @param route route
 */
function sortRouteByOrder(route: ElegantConstRoute) {
  if (route.children?.length) {
    route.children.sort(
      (next, prev) =>
        (Number(next.meta?.order) || 0) - (Number(prev.meta?.order) || 0),
    );
    route.children.forEach(sortRouteByOrder);
  }

  return route;
}

/**
 * @description 按顺序对路由进行排序
 * @description sort routes by order
 *
 * @param routes routes
 */
export function sortRoutesByOrder(routes: ElegantConstRoute[]) {
  routes.sort(
    (next, prev) =>
      (Number(next.meta?.order) || 0) - (Number(prev.meta?.order) || 0),
  );
  routes.forEach(sortRouteByOrder);

  return routes;
}

/**
 * @description 查找菜单路径
 * @description Find menu path
 *
 * @param targetKey Target menu key - [目标菜单 key]
 * @param menu Menu - [菜单]
 */
function findMenuPath(targetKey: string, menu: App.Menu): string[] | null {
  const path: string[] = [];

  function dfs(item: App.Menu): boolean {
    path.push(item.key);

    if (item.key === targetKey) {
      return true;
    }

    if (item.children) {
      for (const child of item.children) {
        if (dfs(child)) {
          return true;
        }
      }
    }

    path.pop();

    return false;
  }

  if (dfs(menu)) {
    return path;
  }

  return null;
}

/**
 * @description 查找选中菜单路径
 * @description Get selected menu key path
 *
 * @param selectedKey - [选中菜单 key]
 * @param menus - [菜单]
 */
export function getSelectedMenuKeyPathByKey(
  selectedKey: string,
  menus: App.Menu[],
) {
  const keyPath: string[] = [];

  menus.some((menu) => {
    const path = findMenuPath(selectedKey, menu);

    const find = Boolean(path?.length);

    if (find) {
      keyPath.push(...(path ?? []));
    }

    return find;
  });

  return keyPath;
}

/**
 * @description 递归获取路由是否存在
 * @description Recursive get is route exist by route name
 *
 * @param route
 * @param routeName
 */
function recursiveGetIsRouteExistByRouteName(
  route: ElegantConstRoute,
  routeName: RouteKey,
) {
  let isExist = route.name === routeName;

  if (isExist) {
    return true;
  }

  if (route.children && route.children.length) {
    isExist = route.children.some((item) =>
      recursiveGetIsRouteExistByRouteName(item, routeName),
    );
  }

  return isExist;
}

/**
 * @description 通过路由名称判断路由是否存在
 * @description Is route exist by route name
 *
 * @param routeName
 * @param routes
 */
export function isRouteExistByRouteName(
  routeName: RouteKey,
  routes: ElegantConstRoute[],
) {
  return routes.some((route) =>
    recursiveGetIsRouteExistByRouteName(route, routeName),
  );
}

/**
 * @description 转换菜单为面包屑
 * @description Transform menu to breadcrumb
 *
 * @param menu
 */
function transformMenuToBreadcrumb(menu: App.Menu) {
  const { children, ...rest } = menu;

  const breadcrumb: App.Breadcrumb = {
    ...rest,
  };

  if (children?.length) {
    breadcrumb.options = children.map(transformMenuToBreadcrumb);
  }

  return breadcrumb;
}

/**
 * @description 通过路由获取面包屑
 * @description Get breadcrumbs by route
 *
 * @param route
 * @param menus
 */
export function getBreadcrumbsByRoute(
  route: RouteLocationNormalizedLoaded,
  menus: App.Menu[],
): App.Breadcrumb[] {
  const key = route.name as string;
  const activeKey = route.meta?.activeMenu;

  const menuKey = activeKey || key;

  for (const menu of menus) {
    if (menu.key === menuKey) {
      const breadcrumbMenu =
        menuKey !== activeKey ? menu : getGlobalMenuByBaseRoute(route);

      return [transformMenuToBreadcrumb(breadcrumbMenu)];
    }

    if (menu.children?.length) {
      const result = getBreadcrumbsByRoute(route, menu.children);
      if (result.length > 0) {
        return [transformMenuToBreadcrumb(menu), ...result];
      }
    }
  }

  return [];
}

/**
 * @description 将菜单转换成搜索菜单
 * @description Convert the menu to search menu
 *
 * @param menus - 菜单
 * @param treeMap
 */
export function transformMenuToSearchMenus(
  menus: App.Menu[],
  treeMap: App.Menu[] = [],
) {
  if (menus && menus.length === 0) return [];
  return menus.reduce((acc, cur) => {
    if (!cur.children) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformMenuToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}
