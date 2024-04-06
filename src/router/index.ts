import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import type { App } from 'vue';
import { transformAuthRouteToVueRoutes } from '@/utils/router';
import { CONSTANT_ROUTES } from './routes';
import { setupRouterGuard } from './guard';

const { VITE_HASH_ROUTE = 'N', VITE_GLOB_BASE_URL } = import.meta.env;

// 白名单应该包含基本静态路由
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach((item) => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });

const basicRoutes = transformAuthRouteToVueRoutes(CONSTANT_ROUTES);
getRouteNames(basicRoutes);

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y'
      ? createWebHashHistory(VITE_GLOB_BASE_URL)
      : createWebHistory(VITE_GLOB_BASE_URL),
  routes: basicRoutes,
  // scrollBehavior,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
  app.use(router);
  // 配置路由守卫
  setupRouterGuard(router);
  await router.isReady();
}

/**
 * @description Reset route - [重置路由]
 */
export function resetRouter() {
  router.getRoutes().forEach((route) => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

/** 路由名称 */
export const routeName = (key: AuthRoute.AllRouteKey) => key;
// /** 路由路径 */
// export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) =>
//   transformRouteNameToRoutePath(key);
//
export * from './routes';
export * from './modules';
export * from './common';
