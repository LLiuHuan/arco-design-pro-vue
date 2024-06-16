import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import type { App } from 'vue';
import { transformAuthRouteToVueRoutes } from '@/router/helper/transform';
import { CONSTANT_ROUTES } from './routes';

const { VITE_HASH_ROUTE = 'N', VITE_GLOB_BASE_URL } = import.meta.env;

const basicRoutes = transformAuthRouteToVueRoutes(CONSTANT_ROUTES);
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
  return router;
}

// /** 路由路径 */
// export const routePath = (key: Exclude<AuthRoute.AllRouteKey, 'not-found'>) =>
//   transformRouteNameToRoutePath(key);
//
// export * from './routes';
// export * from './modules';
// export * from './common';
