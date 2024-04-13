import { PageEnum } from '@/enums';
import type { RouteLocationRaw, Router } from 'vue-router';
import { useRouter } from 'vue-router';
import { unref } from 'vue';
import { isHttpUrl, openWindow } from '@/utils/common';
import { routeName } from '@/utils/router';
import { router } from '@/router';

export type PathAsPageEnum<T> = T extends { path: string }
  ? T & { path: PageEnum }
  : T;
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>;

function handleError(e: Error) {
  console.error(e);
}

export enum GoType {
  'replace',
  'after',
}

interface GoOption {
  query?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * @description: 页面跳转
 * @param _router - 路由 需要注意,在setup()外使用，需要传入_router
 */
export function useGo(_router?: Router) {
  const {
    push,
    replace,
    currentRoute,
    go: routerGo,
  } = _router || useRouter() || router;

  function go(to?: RouteLocationRawEx): void;
  function go(to: RouteLocationRawEx, isReplace: boolean): void;
  function go(
    to: RouteLocationRawEx = PageEnum.BASE_HOME,
    isReplace: boolean = false,
  ) {
    if (!to) {
      return;
    }
    let path = unref(to) as string;
    if (path[0] === '/') {
      path = path.slice(1);
    }
    if (isHttpUrl(path)) {
      openWindow(path);
      return;
    }

    if (isReplace) {
      replace(to).catch(handleError);
    } else {
      push(to).catch(handleError);
    }
  }

  /**
   * @description: 路由跳转 - Route jump
   * @param key
   * @param options
   */
  function goKey(key: AuthRoute.AllRouteKey, options?: GoOption) {
    const { query, params } = options || {};

    const routeLocation: RouteLocationRaw = {
      name: key,
    };

    if (query) {
      routeLocation.query = query;
    }

    if (params) {
      routeLocation.params = params;
    }

    return go(routeLocation);
  }

  /**
   * @description: 返回上一页 - Return to the previous page
   */
  function goBack() {
    routerGo(-1);
  }

  /**
   * @description: 跳转首页 - Jump to the homepage
   */
  function goHome() {
    return goKey(routeName('root'));
  }

  /**
   * @description: 跳转登录页面 - Jump to the login page
   * @param loginModule
   * @param redirectUrl
   */
  function goLogin(loginModule?: LoginModuleType, redirectUrl?: string) {
    const module = loginModule || 'pwd-login';

    const options: GoOption = {
      params: {
        module,
      },
    };

    const redirect = redirectUrl || unref(currentRoute).fullPath;

    options.query = {
      redirect,
    };

    return goKey(PageEnum.LOGIN, options);
  }

  /**
   * @description: 切换登录模块 - Toggle login module
   * @param loginModule
   */
  const toLoginModule = (loginModule?: LoginModuleType) => {
    const module = loginModule || 'pwd-login';

    const routeLocation: RouteLocationRaw = {
      name: PageEnum.LOGIN,
      params: { module },
    };
    const { query } = unref(currentRoute);
    Object.assign(routeLocation, { query });
    return go(routeLocation);
  };

  const toRedirect = () => {
    const { query } = unref(currentRoute);
    if (query?.redirect) {
      return go(query.redirect as string);
    }
    return goHome();
  };

  return {
    go,
    goKey,
    goBack,
    goHome,
    goLogin,
    toLoginModule,
    toRedirect,
  };
}

/**
 * @description: redo current page
 * @param _router
 */
export const useRedo = (_router?: Router) => {
  const { replace, currentRoute } = _router || useRouter();
  const { query, params = {}, name, fullPath } = unref(currentRoute.value);
  function redo(): Promise<boolean> {
    return new Promise((resolve) => {
      if (name === PageEnum.REDIRECT) {
        resolve(false);
        return;
      }
      if (name && Object.keys(params).length > 0) {
        params._originParams = JSON.stringify(params ?? {});
        params._redirectType = 'name';
        params.path = String(name);
      } else {
        params._redirectType = 'path';
        params.path = fullPath;
      }
      replace({ name: PageEnum.REDIRECT, params, query }).then(() =>
        resolve(true),
      );
    });
  }
  return redo;
};
