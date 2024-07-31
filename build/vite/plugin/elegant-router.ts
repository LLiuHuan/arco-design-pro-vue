/**
 * @description vue-router 自动生成插件
 * @description vue-router auto generate plugin
 *
 * https://github.com/soybeanjs/elegant-router
 */
import ElegantVueRouter from '@elegant-router/vue/vite';
import type { RouteKey } from '@elegant-router/types';
import { RouteMeta } from 'vue-router';

export function configElegantRouterPlugin() {
  return ElegantVueRouter({
    dtsDir: 'types/elegant-router.d.ts',
    layouts: {
      basic: 'src/layout/basic-layout/index.vue',
      blank: 'src/layout/blank-layout/index.vue',
    },
    defaultLayout: 'basic',
    customRoutes: {
      names: ['exception_403', 'exception_404', 'exception_500'],
    },
    routePathTransformer(routeName, routePath) {
      const key = routeName as RouteKey;

      if (key === 'login') {
        const modules: LoginModuleType[] = [
          'pwd-login',
          'code-login',
          'register',
          'reset-pwd',
          'bind-wechat',
        ];

        const moduleReg = modules.join('|');

        return `/login/:module(${moduleReg})?`;
      }

      return routePath;
    },
    onRouteMetaGen(routeName) {
      const key = routeName as RouteKey;

      const constantRoutes: RouteKey[] = ['login', '403', '404', '500'];

      const meta: Partial<RouteMeta> = {
        title: key,
        i18nKey: `route.${key}.title`,
      };

      if (constantRoutes.includes(key)) {
        meta.constant = true;
      }

      return meta;
    },
  });
}
