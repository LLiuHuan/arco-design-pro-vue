import { App } from 'vue';
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { createRouterGuards } from '@/router/router-guards';
import { RedirectRoute } from '@/router/base';

const modules = import.meta.globEager('./modules/**/*.ts');

const routeModuleList: RouteRecordRaw[] = [];

Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  const modList = Array.isArray(mod) ? [...mod] : mod;
  routeModuleList.push(...modList);
});

function sortRoute(a, b) {
  return (a.meta?.sort || 0) - (b.meta?.sort || 0);
}

routeModuleList.sort(sortRoute);

const RootRouter: RouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: RouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/login/index.vue'),
  meta: {
    title: 'login',
  },
};

//
export const asyncRoutes = [...routeModuleList];

// 普通路由 无需权限验证
export const constantRouter: any[] = [RootRouter, RedirectRoute, LoginRoute];
const router = createRouter({
  history: createWebHashHistory(''),
  routes: constantRouter,
  // strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

export function setupRouter(app: App) {
  app.use(router);
  // 路由守卫
  createRouterGuards(router);
}

export default router;
