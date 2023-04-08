import { getLoginModuleRegExp } from '@/utils';

/** 根路由: / */
export const ROOT_ROUTE: AuthRoute.Route = {
  name: 'root',
  path: '/',
  redirect: import.meta.env.VITE_ROUTE_HOME_PATH,
  meta: {
    title: 'Root',
  },
};

/** 固定的路由 */
export const constantRoutes: AuthRoute.Route[] = [
  ROOT_ROUTE,
  {
    name: 'login',
    path: '/login',
    component: 'self',
    props: (route) => {
      const moduleType = (route.params.module as EnumType.LoginModuleKey) || 'pwd-login';
      return {
        module: moduleType,
      };
    },
    meta: {
      title: '登录',
      dynamicPath: `/login/:module(${getLoginModuleRegExp()})?`,
      singleLayout: 'blank',
    },
  },
  {
    name: 'no-permission',
    path: '/no-permission',
    component: 'self',
    meta: {
      title: '无权限',
      singleLayout: 'blank',
    },
  },
  {
    name: 'not-found',
    path: '/not-found',
    component: 'self',
    meta: {
      title: '未找到',
      singleLayout: 'blank',
    },
  },
  {
    name: 'service-error',
    path: '/service-error',
    component: 'self',
    meta: {
      title: '服务器错误',
      singleLayout: 'blank',
    },
  },
  // 匹配无效路径的路由
  {
    name: 'not-found-page',
    path: '/:pathMatch(.*)*',
    component: 'blank',
    meta: {
      title: '未找到',
      singleLayout: 'blank',
    },
  },
  {
    name: 'redirect',
    path: '/redirect',
    component: 'self',
    children: [
      {
        name: 'redirect',
        path: '/redirect/:path(.*)',
        component: 'self',
        meta: {
          title: '重定向',
          // requiresAuth: true,
          // icon: 'icon-park-outline:analysis',
        },
      },
    ],
    meta: {
      title: '重定向',
    },
  },
  {
    name: 'link',
    path: '/link',
    component: 'self',
    meta: {
      title: '跳转提示',
    },
  },
];
