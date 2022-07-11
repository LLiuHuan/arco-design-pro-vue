import type { RouteRecordRaw } from 'vue-router';
import { consoleError } from '@/utils';
import { getLayoutComponent, getViewComponent } from './component';

/**
 * 获取所有固定路由的名称集合
 * @param routes - 固定路由
 */
export function getConstantRouteNames(routes: AuthRoute.Route[]) {
  return routes.map((route) => getConstantRouteName(route)).flat(1);
}

/**
 * 将权限路由转换成vue路由
 * @param routes - 权限路由
 * @description 所有多级路由都会被转换成二级路由
 */
export function transformAuthRoutesToVueRoutes(routes: AuthRoute.Route[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

/**
 * 将权限路由转换成搜索的菜单数据
 * @param routes - 权限路由
 * @param treeMap
 */
export function transformAuthRoutesToSearchMenus(
  routes: AuthRoute.Route[],
  treeMap: AuthRoute.Route[] = []
) {
  if (routes && routes.length === 0) return [];
  return routes.reduce((acc, cur) => {
    if (!cur.meta?.hide) {
      acc.push(cur);
    }
    if (cur.children && cur.children.length > 0) {
      transformAuthRoutesToSearchMenus(cur.children, treeMap);
    }
    return acc;
  }, treeMap);
}

/** 将路由名字转换成路由路径 */
export function transformRouteNameToRoutePath(
  name: Exclude<AuthRoute.RouteKey, 'not-found-page'>
): AuthRoute.RoutePath {
  const rootPath: AuthRoute.RoutePath = '/';
  if (name === 'root') return rootPath;

  const splitMark: AuthRoute.RouteSplitMark = '_';
  const pathSplitMark = '/';
  const path = name.split(splitMark).join(pathSplitMark);

  return (pathSplitMark + path) as AuthRoute.RoutePath;
}

/** 将路由路径转换成路由名字 */
export function transformRoutePathToRouteName(
  path: Exclude<AuthRoute.RoutePath, '/not-found-page' | '/:pathMatch(.*)*'>
): AuthRoute.RouteKey {
  if (path === '/') return 'root';

  const pathSplitMark = '/';
  const routeSplitMark: AuthRoute.RouteSplitMark = '_';

  return path.split(pathSplitMark).slice(1).join(routeSplitMark) as AuthRoute.RouteKey;
}

/**
 * 获取所有固定路由的名称集合
 * @param route - 固定路由
 */
function getConstantRouteName(route: AuthRoute.Route) {
  const names = [route.name];
  if (hasChildren(route)) {
    names.push(...route.children!.map((item) => getConstantRouteName(item)).flat(1));
  }
  return names;
}

type ComponentAction = Record<AuthRoute.RouteComponent, () => void>;

/**
 * 将单个权限路由转换成vue路由
 * @param item - 单个权限路由
 */
export function transformAuthRouteToVueRoute(item: AuthRoute.Route) {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  // 动态path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta.dynamicPath });
  }

  // 外链路由
  if (hasHref(item)) {
    Object.assign(itemRoute, { component: getViewComponent('not-found-page') });
  }

  // 路由组件
  if (hasComponent(item)) {
    const action: ComponentAction = {
      basic() {
        itemRoute.component = getLayoutComponent('basic');
      },
      blank() {
        itemRoute.component = getLayoutComponent('blank');
      },
      multi() {
        // 多级路由一定有子路由
        if (hasChildren(item)) {
          Object.assign(itemRoute, { meta: { ...itemRoute.meta, multi: true } });
          delete itemRoute.component;
        } else {
          consoleError('多级路由缺少子路由: ', item);
        }
      },
      self() {
        itemRoute.component = getViewComponent(item.name);
      },
    };
    try {
      if (item.component) {
        action[item.component]();
      } else {
        consoleError('路由组件解析失败: ', item);
      }
    } catch {
      consoleError('路由组件解析失败: ', item);
    }
  }

  // 注意：单独路由没有children
  if (isSingleRoute(item)) {
    if (hasChildren(item)) {
      consoleError('单独路由不应该有子路由: ', item);
    }

    // 捕获无效路由的需特殊处理
    if (item.name === 'not-found-page') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: getViewComponent('not-found-page'),
        },
      ];
    } else {
      const parentPath = `${itemRoute.path}-parent` as AuthRoute.SingleRouteParentPath;

      const layout =
        item.meta.singleLayout === 'basic'
          ? getLayoutComponent('basic')
          : getLayoutComponent('blank');

      const parentRoute: RouteRecordRaw = {
        path: parentPath,
        component: layout,
        redirect: item.path,
        children: [itemRoute],
      };

      return [parentRoute];
    }
  }

  // 子路由
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.Route[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat();
    // 找出第一个不为多级路由中间级的子路由或非隐藏路由路径作为重定向路径
    const redirectPath: AuthRoute.RoutePath = (children.find((v) => !v.meta?.multi && !v.meta?.hide)
      ?.path || '/') as AuthRoute.RoutePath;
    if (redirectPath === '/') {
      consoleError('该多级路由没有有效的子路径', item);
    }

    if (item.component === 'multi') {
      // 多级路由，将子路由提取出来变成同级
      resultRoute.push(...children);
      delete itemRoute.children;
    } else {
      itemRoute.children = children;
    }
    if (redirectPath !== '/') {
      itemRoute.redirect = redirectPath;
    }
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

/**
 * 是否有外链
 * @param item - 权限路由
 */
function hasHref(item: AuthRoute.Route) {
  return Boolean(item.meta.href);
}

/**
 * 是否有动态路由path
 * @param item - 权限路由
 */
function hasDynamicPath(item: AuthRoute.Route) {
  return Boolean(item.meta.dynamicPath);
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(item: AuthRoute.Route) {
  return Boolean(item.component);
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
function hasChildren(item: AuthRoute.Route) {
  return Boolean(item.children && item.children.length);
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(item: AuthRoute.Route) {
  return Boolean(item.meta.singleLayout);
}
