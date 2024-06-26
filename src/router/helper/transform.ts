import type { RouteRecordRaw } from 'vue-router';
import { consoleError } from '@/utils/common';
import { getLayoutComponent, getViewComponent } from './component';

type ComponentAction = Record<AuthRoute.RouteComponentType, () => void>;

/**
 * 是否有外链
 * @param item - 权限路由
 */
function hasHref(item: AuthRoute.ConstRoute) {
  return Boolean(item.meta?.href);
}

/**
 * 是否有动态路由path
 * @param item - 权限路由
 */
function hasDynamicPath(item: AuthRoute.ConstRoute) {
  return Boolean(item.meta?.dynamicPath);
}

/**
 * 是否有路由组件
 * @param item - 权限路由
 */
function hasComponent(item: AuthRoute.ConstRoute) {
  return Boolean(item.component);
}

/**
 * 是否有子路由
 * @param item - 权限路由
 */
function hasChildren(item: AuthRoute.ConstRoute) {
  return Boolean(item.children && item.children.length);
}

/**
 * 是否是常量路由
 * @param item
 */
function isConstantRoute(item: AuthRoute.ConstRoute) {
  return item.meta?.constant;
}

/**
 * 是否是单层级路由
 * @param item - 权限路由
 */
function isSingleRoute(item: AuthRoute.ConstRoute) {
  return Boolean(item.meta?.singleLayout);
}

/**
 * 将单个权限路由转换成vue路由
 * TODO: 有机会重构一下吧
 * @param item - 单个权限路由
 */
export function transformAuthRouteToVueRoute(item: AuthRoute.ConstRoute) {
  const resultRoute: RouteRecordRaw[] = [];

  const itemRoute = { ...item } as RouteRecordRaw;

  // 动态path
  if (hasDynamicPath(item)) {
    Object.assign(itemRoute, { path: item.meta?.dynamicPath });
  }

  // 外链路由
  if (hasHref(item)) {
    Object.assign(itemRoute, { component: getViewComponent('not-found') });
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
          Object.assign(itemRoute, {
            meta: { ...itemRoute.meta, multi: true },
          });
          delete itemRoute.component;
        } else {
          consoleError('多级路由缺少子路由: ', item);
        }
      },
      self() {
        // 中间带路由参数的路由，需要将路由参数去掉，才能找到对应的组件
        // const pathSplitMark = '/';
        const routeSplitMark = '_';
        const name = item.name
          .split(routeSplitMark)
          .filter((v) => !v.startsWith(':'))
          .join(routeSplitMark) as AuthRoute.RouteKey;
        itemRoute.component = getViewComponent(name as AuthRoute.RouteKey);
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
    if (item.name === 'not-found') {
      itemRoute.children = [
        {
          path: '',
          name: item.name,
          component: getViewComponent('not-found'),
        },
      ];
    } else if (isConstantRoute(item)) {
      return itemRoute;
    } else {
      const parentPath =
        `${itemRoute.path}-parent` as AuthRouteUtils.SingleRouteKey;

      const layout =
        item.meta?.singleLayout === 'basic'
          ? getLayoutComponent('basic')
          : getLayoutComponent('blank');

      const parentRoute: RouteRecordRaw = {
        name: `${item.name}-parent`,
        path: parentPath,
        children: [itemRoute],
        component: layout,
        redirect: item.path,
      };

      return [parentRoute];
    }
  }

  // 子路由
  if (hasChildren(item)) {
    const children = (item.children as AuthRoute.ConstRoute[])
      .map((child) => transformAuthRouteToVueRoute(child))
      .flat();

    // 找出第一个不为多级路由中间级的子路由路径作为重定向路径
    const redirectPath = (children.find((v) => !v.meta?.multi)?.path ||
      '/') as AuthRoute.RoutePath;

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
    itemRoute.redirect = redirectPath;
  }

  resultRoute.push(itemRoute);

  return resultRoute;
}

/**
 * @description 将权限路由转换成vue路由
 * @description Convert permission routing to vue routing
 *
 * @param routes - Permissions routing - [权限路由]
 * @description All multi-level routes will be converted into secondary routes - [所有多级路由都会被转换成二级路由]
 */
export function transformAuthRouteToVueRoutes(routes: AuthRoute.ConstRoute[]) {
  return routes.map((route) => transformAuthRouteToVueRoute(route)).flat(1);
}

/**
 * @description 将路由路径转换成路由名称
 * @description Convert the route path to the route name
 *
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
 * @description 将路由名字转换成路由路径
 * @description Convert the route name to the route path
 *
 * @param name
 */
export function transformRouteNameToRoutePath(
  name: AuthRoute.AllRouteKey,
): AuthRoute.RoutePath {
  const rootPath: AuthRoute.RoutePath = '/';
  if (name === 'root') return rootPath;

  const splitMark = '_';
  const pathSplitMark = '/';
  const path = name.split(splitMark).join(pathSplitMark);

  return (pathSplitMark + path) as AuthRoute.RoutePath;
}

/**
 * @description 将路由名字中带参数的转换成路由参数
 * @description Convert the route name to the route path
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
