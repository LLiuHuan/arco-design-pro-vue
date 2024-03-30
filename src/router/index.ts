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

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y'
      ? createWebHashHistory(VITE_GLOB_BASE_URL)
      : createWebHistory(VITE_GLOB_BASE_URL),
  routes: transformAuthRouteToVueRoutes(CONSTANT_ROUTES),
  // scrollBehavior,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
  app.use(router);
  setupRouterGuard(router);
  await router.isReady();
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
