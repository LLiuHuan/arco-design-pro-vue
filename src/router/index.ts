import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';
import type { App } from 'vue';
import { createBuiltinVueRoutes } from './routes/builtin';

const { VITE_HASH_ROUTE = 'N', VITE_GLOB_BASE_URL } = import.meta.env;

// const basicRoutes = transformAuthRouteToVueRoutes(CONSTANT_ROUTES);
export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'Y'
      ? createWebHashHistory(VITE_GLOB_BASE_URL)
      : createWebHistory(VITE_GLOB_BASE_URL),
  routes: createBuiltinVueRoutes(),
  // scrollBehavior,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

/** setup vue router. - [安装vue路由] */
export async function setupRouter(app: App) {
  app.use(router);

  return router;
}
