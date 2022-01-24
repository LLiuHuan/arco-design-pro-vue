import { Router, RouteRecordRaw } from 'vue-router';
import { PageEnum } from '@/enums/pageEnum';
import { ErrorPageRoute } from '@/router/base';
import { useI18n } from '@/hooks/web/useI18n';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { storage } from '@/utils/storage';
import { ACCESS_TOKEN } from '@/store/mutation-types';

const LOGIN_PATH = PageEnum.BASE_LOGIN;
const INIT_DB = PageEnum.INIT_DB;

const whitePathList = [LOGIN_PATH, INIT_DB]; // no redirect whitelist
let asyncRouterFlag = 0;

export function createRouterGuards(router: Router) {
  // to, from, next
  router.beforeEach((to, from, next) => {
    if (from.path === LOGIN_PATH && to.name === 'errorPage') {
      next(PageEnum.BASE_HOME);
      return;
    }

    // Whitelist can be directly entered
    if (whitePathList.includes(to.path as PageEnum)) {
      next();
      return;
    }

    const token = storage.get(ACCESS_TOKEN);
    if (!token) {
      // You can access without permissions. You need to set the routing meta.ignoreAuth to true
      if (to.meta.ignoreAuth) {
        next();
        return;
      }
      // redirect login page
      const redirectData: { path: string; replace: boolean; query?: Recordable<string> } = {
        path: LOGIN_PATH,
        replace: true,
      };

      if (to.path) {
        redirectData.query = {
          ...redirectData.query,
          redirect: to.path,
        };
      }
      next(redirectData);
      return;
    }

    if (!asyncRouterFlag) {
      asyncRouterFlag++;
      generatorDynamicRouter().then((routes) => {
        if (routes) {
          // 动态添加可访问路由表
          routes.forEach((item) => {
            if (item.path.indexOf('http://') == -1 && item.path.indexOf('https://') == -1) {
              router.addRoute(item as unknown as RouteRecordRaw);
            }
          });

          //添加404
          const isErrorPage = router
            .getRoutes()
            .findIndex((item) => item.name === ErrorPageRoute.name);
          if (isErrorPage === -1) {
            router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw);
          }

          const redirectPath = (from.query.redirect || to.path) as string;
          const redirect = decodeURIComponent(redirectPath);
          const nextData = to.path === redirect ? { ...to, replace: true } : { path: redirect };
          // asyncRouteStore.setDynamicAddedRoute(true);
          // storage.set('DynamicAddedRoute', true);
          next(nextData);
          // Loading && Loading.finish();
        }
      });
    } else {
      next();
    }
  });

  // , failure
  router.afterEach((to, _) => {
    // TODO: 有些大问题，暂时先这样吧
    const { t } = useI18n('');
    if ((to.meta?.title as string).indexOf('menu.') !== -1) {
      document.title = t(to?.meta?.title as string) || document.title;
    } else {
      document.title = to.meta?.title as string;
    }
  });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
