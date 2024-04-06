import type { Router, RouteRecordRaw } from 'vue-router';
import { PageEnum, REFRESH_TOKEN_KEY } from '@/enums';
import { INVALID_ROUTE, routeName } from '@/router';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { localStg } from '@/utils/cache';

const {
  BASE_LOGIN_NAME: LOGIN_NAME,
  ROOT_NAME,
  INVALID_NAME,
  BASE_NAME,
} = PageEnum;

// White list, no need to verify permissions
// 白名单，无需验证权限
const whitePathList: AuthRoute.AllRouteKey[] = [];

function exeStrategyActions(actions: StrategyAction[]) {
  actions.some((item) => {
    const [flag, action] = item;
    if (flag) {
      action();
    }
    return flag;
  });
}

export function createPermissionGuard(router: Router) {
  const authStore = useAuthStoreWithOut();
  const route = useRouteStoreWithOut();
  router.beforeEach(async (to, from, next) => {
    const token = authStore.getToken;

    const isLogin = Boolean(token);
    const permissions = to.meta.roles || [];
    const needLogin = !to.meta.ignoreAuth || Boolean(permissions.length);
    const hasPermission =
      !permissions.length ||
      permissions.some((role) => authStore.getUserInfo.userRole.includes(role));

    // Dynamic route loading (first time)
    // 动态路由加载（首次）
    if (!route.isInitAuthRoute) {
      if (!isLogin) {
        if (to.name === LOGIN_NAME) {
          next();
          return;
        }
        const redirect = to.fullPath;
        next({ name: LOGIN_NAME, query: { redirect } });
        return;
      }

      // const routes = await permissionStore.buildRoutesAction();
      // 记录动态路由加载完成
      await route.initAuthRoute();
      router.addRoute(INVALID_ROUTE as unknown as RouteRecordRaw);
      // permissionStore.setDynamicAddedRoute(true);

      // 现在的to动态路由加载之前的，可能为PAGE_NOT_FOUND_ROUTE（例如，登陆后，刷新的时候）
      // 此处应当重定向到fullPath，否则会加载404页面内容

      if (to.name === INVALID_NAME) {
        // 动态路由没有加载导致被not-found-page路由捕获，等待权限路由加载好了，回到之前的路由
        // 若路由是从根路由重定向过来的，重新回到根路由
        const path = to.redirectedFrom?.name === ROOT_NAME ? '/' : to.fullPath;
        next({ path, replace: true, query: to.query, hash: to.hash });
        return;
      }
    }

    // 权限路由已经加载，仍然未找到，重定向到not-found
    if (to.name === INVALID_NAME) {
      next({ name: INVALID_NAME, replace: true });
      return;
    }

    // External link routing, open in a new tab and return to the previous routing
    // 外链路由, 从新标签打开，返回上一个路由
    // 外链路由不可能有权限吧
    if (to.meta.href) {
      window.open(to.meta.href);
      next({ path: from.fullPath, replace: true, query: from.query });
      return;
    }

    const actions: StrategyAction[] = [
      // 白名单直接放行
      [
        whitePathList.includes(to.name as AuthRoute.AllRouteKey),
        () => {
          if (to.name === LOGIN_NAME && isLogin) {
            const isSessionTimeout = authStore.getSessionTimeout;
            try {
              authStore.handleActionAfterLogin({
                token,
                refreshToken: localStg.get(REFRESH_TOKEN_KEY) || '',
              });
              if (!isSessionTimeout) {
                next(decodeURIComponent((to.query?.redirect as string) || '/'));
                return;
              }
            } catch {
              //
            }
          }
          next();
        },
      ],
      // 已登录状态跳转登录页，跳转至首页
      [
        isLogin && to.name === LOGIN_NAME,
        () => {
          next({ name: ROOT_NAME });
        },
      ],
      // If it is a root route and jumps to the homepage, and there is a homepage path in the user information, and the homepage path is not the homepage, then redirect to the user's homepage path.
      // 如果是根路由，且跳转到首页，且用户信息中有首页路径，且首页路径不是首页，则重定向到用户首页路径
      [
        from.name === ROOT_NAME &&
          to.name === BASE_NAME &&
          Boolean(authStore.getUserInfo.homeName) &&
          authStore.getUserInfo.homeName !== BASE_NAME,
        () => {
          next({ name: authStore.getUserInfo.homeName });
        },
      ],
      // 不需要登录权限的页面直接通行
      [
        !needLogin,
        () => {
          next();
        },
      ],
      // 未登录状态进入需要登录权限的页面
      [
        !isLogin && needLogin,
        () => {
          const redirect = to.fullPath;
          next({ name: LOGIN_NAME, query: { redirect } });
        },
      ],
      // 登录状态进入需要登录权限的页面，有权限直接通行
      [
        isLogin && needLogin && hasPermission,
        () => {
          next();
        },
      ],
      [
        // 登录状态进入需要登录权限的页面，无权限，重定向到无权限页面
        isLogin && needLogin && !hasPermission,
        () => {
          next({ name: routeName('403') });
        },
      ],
    ];

    exeStrategyActions(actions);
  });
}
