import type {
  LocationQueryRaw,
  NavigationGuardNext,
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
} from 'vue-router';
import { PageEnum } from '@/enums';
import { useRouteStore } from '@/store/modules/route';
import { useAuthStore } from '@/store/modules/auth';
import type { RoutePath } from '@elegant-router/types';
import { getRouteName } from '../elegant/transform';

function getRouteQueryOfLoginRoute(
  to: RouteLocationNormalized,
  routeHome: string,
) {
  const redirect = to.fullPath;
  const [redirectPath, redirectQuery] = redirect.split('?');
  const redirectName = getRouteName(redirectPath as RoutePath);

  const isRedirectHome = routeHome === redirectName;

  const query: LocationQueryRaw =
    to.name !== PageEnum.LOGIN && !isRedirectHome ? { redirect } : {};

  if (isRedirectHome && redirectQuery) {
    query.redirect = `/?${redirectQuery}`;
  }

  return query;
}

// 动态路由加载（首次）
async function initRoute(
  to: RouteLocationNormalized,
): Promise<RouteLocationRaw | null> {
  const authStore = useAuthStore();
  const routeStore = useRouteStore();

  const isNotFoundRoute = to.name === PageEnum.INVALID;
  // 1. 如果常量路由没有初始化，则初始化常量路由
  if (!routeStore.isInitConstantRoute) {
    console.log('initConstantRoute');
    await routeStore.initConstantRoute();

    // 1.1 该路由被"not-found"路由捕获，因为常量路由未初始化
    // 常量路由初始化后，重定向到原来的路由
    if (isNotFoundRoute) {
      const path = to.fullPath;

      return {
        path,
        replace: true,
        query: to.query,
        hash: to.hash,
      };
    }
  }

  // 1.2 如果该路由是常量路由，但不是"not-found"路由，则允许访问。
  if (to.meta.constant && !isNotFoundRoute) {
    return null;
  }

  // 1.3 初始化动态路由, 不是"not-found"路由，则允许访问
  if (routeStore.isInitAuthRoute && !isNotFoundRoute) {
    return null;
  }

  // 1.4 被"not-found"路由捕获，然后检查该路由是否存在
  if (routeStore.isInitAuthRoute && isNotFoundRoute) {
    const exist = await routeStore.getIsAuthRouteExist(to.path as RoutePath);

    if (exist) {
      return {
        name: PageEnum.NO_AUTH,
      };
    }

    return null;
  }

  // 1.5 如果权限路由没有初始化，则初始化权限路由
  const isLogin = Boolean(authStore.getToken);
  // 初始化auth路由需要用户登录，如果没有，重定向到登录页面
  if (!isLogin) {
    const query = getRouteQueryOfLoginRoute(to, routeStore.routeHome);

    return {
      name: PageEnum.LOGIN,
      query,
    };
  }

  // await authStore.initUserInfo();

  // 1.6 初始化auth路由
  await routeStore.initAuthRoute();

  // 1.7 该路由被"not-found"路由捕获，因为权限路由未初始化，路由初始化后，重定向到原来的路由
  if (isNotFoundRoute) {
    const path = to.redirectedFrom?.name === PageEnum.ROOT ? '/' : to.fullPath;

    return {
      path,
      replace: true,
      query: to.query,
      hash: to.hash,
    };
  }

  return null;
}

function handleRouteSwitch(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  // route with href
  if (to.meta.href) {
    window.open(to.meta.href, '_blank');

    next({
      path: from.fullPath,
      replace: true,
      query: from.query,
      hash: to.hash,
    });

    return;
  }

  next();
}

export function createPermissionGuard(router: Router) {
  // const { handleActionAfterLogin } = useAuth();
  router.beforeEach(async (to, from, next) => {
    const location = await initRoute(to);

    if (location) {
      next(location);
      return;
    }

    const authStore = useAuthStore();

    const isLogin = Boolean(authStore.getToken);
    const needLogin = !to.meta.constant;
    const routeRoles = to.meta.roles || [];

    const hasRole =
      !routeRoles.length ||
      authStore.roleList.some((role) => routeRoles.includes(role));

    const hasAuth = authStore.isStaticSuper || !routeRoles.length || hasRole;

    const actions: StrategyAction[] = [
      // 登录时如果是login路由则切换到根页面
      [
        isLogin && to.name === PageEnum.LOGIN,
        () => {
          next({ name: PageEnum.ROOT });
        },
      ],
      // 如果是常量路由，则允许直接访问
      [
        !needLogin,
        () => {
          handleRouteSwitch(to, from, next);
        },
      ],
      // 如果路由需要登录但用户未登录，则切换到登录页面
      [
        !isLogin && needLogin,
        () => {
          next({ name: PageEnum.LOGIN, query: { redirect: to.fullPath } });
        },
      ],
      // 如果用户已登录并有授权，则允许访问
      [
        isLogin && needLogin && hasAuth,
        () => {
          handleRouteSwitch(to, from, next);
        },
      ],
      [
        // 如果用户已登录但没有授权，则切换到403页面
        isLogin && needLogin && !hasAuth,
        () => {
          next({ name: PageEnum.NO_AUTH });
        },
      ],
    ];

    actions.some((item) => {
      const [flag, action] = item;
      if (flag) {
        action();
      }
      return flag;
    });
  });
}
