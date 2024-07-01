import { transformRouteNameToRoutePath } from '@/router/helper/transform';
import { getLoginModuleRegExp } from '../helper/helper';
import { routes as staticRoutes } from '../modules';

/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.ConstRoute = {
  name: 'root',
  path: '/',
  redirect: transformRouteNameToRoutePath(import.meta.env.VITE_ROUTE_HOME_PATH),
  meta: {
    title: 'root',
    constant: true,
  },
};

export const LOGIN_ROUTE: AuthRoute.ConstRoute = {
  name: 'login',
  path: '/login',
  component: 'self',
  props: (route) => {
    const moduleType = (route.params.module as LoginModuleType) || 'pwd-login';
    return {
      module: moduleType,
    };
  },
  meta: {
    title: '登录',
    i18nKey: 'route.login',
    dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
    singleLayout: 'basic',
    constant: true,
  },
};

// export const CONSTANT_PAGE_ROUTE: AuthRoute.Route = {
//   name: 'constant-page',
//   path: '/constant-page',
//   component: 'self',
//   meta: {
//     title: '固定页面',
//     singleLayout: 'blank',
//   },
// };

export const NO_PERMISSION_ROUTE: AuthRoute.ConstRoute = {
  name: '403',
  path: '/403',
  component: 'self',
  meta: {
    title: '无权限',
    singleLayout: 'blank',
    constant: true,
  },
  props: {
    status: 403,
  },
};

export const NOT_FOUND_ROUTE: AuthRoute.ConstRoute = {
  name: '404',
  path: '/404',
  component: 'self',
  meta: {
    title: '未找到',
    singleLayout: 'blank',
    constant: true,
  },
};

export const SERVER_ERROR_ROUTE: AuthRoute.ConstRoute = {
  name: '500',
  path: '/500',
  component: 'self',
  meta: {
    title: '服务器错误',
    singleLayout: 'blank',
    constant: true,
  },
};

export const INVALID_ROUTE: AuthRoute.ConstRoute = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: 'blank',
  meta: {
    title: '无效路径',
    i18nKey: 'route.404',
    singleLayout: 'blank',
    constant: true,
  },
};

export const REDIRECT_ROUTE: AuthRoute.ConstRoute = {
  name: 'redirect',
  path: '/redirect',
  component: 'self',
  meta: {
    title: '重定向',
    dynamicPath: `/redirect/:path(.*)/:_redirectType(.*)/:_originParams(.*)?`,
    singleLayout: 'blank',
    constant: true,
  },
};

export const CONSTANT_ROUTES: AuthRoute.ConstRoute[] = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  // CONSTANT_PAGE_ROUTE,
  NO_PERMISSION_ROUTE,
  NOT_FOUND_ROUTE,
  SERVER_ERROR_ROUTE,
  INVALID_ROUTE,
  REDIRECT_ROUTE,
];

/**
 * @description 当auth路由模式为静态时创建路由
 * @description create routes when the auth route mode is static
 */
export function createStaticRoutes() {
  const constantRoutes: AuthRoute.ConstRoute[] = [];
  const authRoutes: AuthRoute.ConstRoute[] = [];

  [...staticRoutes].forEach((route) => {
    if (route.meta?.constant) {
      constantRoutes.push(route);
    } else {
      authRoutes.push(route);
    }
  });

  return {
    constantRoutes,
    authRoutes,
  };
}
