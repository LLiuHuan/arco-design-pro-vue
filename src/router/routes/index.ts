import { getLoginModuleRegExp } from '@/utils/router';

/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'root',
  },
};

export const LOGIN_ROUTE: AuthRoute.Route = {
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
    i18nTitle: 'route.login',
    dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
    singleLayout: 'blank',
  },
};

export const CONSTANT_PAGE_ROUTE: AuthRoute.Route = {
  name: 'constant-page',
  path: '/constant-page',
  component: 'self',
  meta: {
    title: '固定页面',
    singleLayout: 'blank',
  },
};

export const NO_PERMISSION_ROUTE: AuthRoute.Route = {
  name: '403',
  path: '/403',
  component: 'self',
  meta: {
    title: '无权限',
    singleLayout: 'blank',
  },
  props: {
    status: 403,
  },
};

export const NOT_FOUND_ROUTE: AuthRoute.Route = {
  name: '404',
  path: '/404',
  component: 'self',
  meta: {
    title: '未找到',
    singleLayout: 'blank',
  },
};

export const SERVER_ERROR_ROUTE: AuthRoute.Route = {
  name: '500',
  path: '/500',
  component: 'self',
  meta: {
    title: '服务器错误',
    singleLayout: 'blank',
  },
};

export const INVALID_ROUTE: AuthRoute.Route = {
  name: 'not-found',
  path: '/:pathMatch(.*)*',
  component: 'blank',
  meta: {
    title: '无效路径',
    i18nTitle: 'route.404',
    singleLayout: 'blank',
  },
};

export const REDIRECT_ROUTE: AuthRoute.Route = {
  name: 'redirect',
  path: '/redirect',
  component: 'self',
  meta: {
    title: '重定向',
    dynamicPath: `/redirect/:path(.*)/:_redirectType(.*)/:_originParams(.*)?`,
    singleLayout: 'blank',
  },
};

export const CONSTANT_ROUTES: AuthRoute.Route[] = [
  ROOT_ROUTE,
  LOGIN_ROUTE,
  CONSTANT_PAGE_ROUTE,
  NO_PERMISSION_ROUTE,
  NOT_FOUND_ROUTE,
  SERVER_ERROR_ROUTE,
  INVALID_ROUTE,
  REDIRECT_ROUTE,
];
