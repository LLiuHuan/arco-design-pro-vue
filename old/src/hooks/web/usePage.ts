import { PageEnum } from '@/enums';
import type { NavigationFailure, RouteLocationRaw } from 'vue-router';
import { useRouter } from 'vue-router';
import { unref } from 'vue';
import { isHttpUrl, openWindow } from '@/utils/common';
import { router } from '@/router';
import type { RouteKey } from '@elegant-router/types';

export type PathAsPageEnum<T> = T extends { path: string }
  ? T & { path: PageEnum }
  : T;
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>;

export enum GoType {
  'replace',
  'after',
}

interface GoOption {
  query?: Record<string, string>;
  params?: Record<string, string>;
}

/**
 * @description 页面跳转
 * @description Page jump
 *
 * @param isSetup
 */
export function useGo(isSetup = true) {
  const {
    push,
    back,
    replace,
    currentRoute,
    go: routerGo,
  } = isSetup ? useRouter() : router;

  function go(
    to?: RouteLocationRawEx,
  ): Promise<NavigationFailure | void | undefined>;
  function go(
    to: RouteLocationRawEx,
    isReplace: boolean,
  ): Promise<NavigationFailure | void | undefined>;
  function go(
    to: RouteLocationRawEx = PageEnum.BASE_HOME,
    isReplace: boolean = false,
  ): Promise<NavigationFailure | void | undefined> {
    if (!to) {
      return Promise.resolve();
    }
    let path = unref(to) as string;
    if (path[0] === '/') {
      path = path.slice(1);
    }
    if (isHttpUrl(path)) {
      openWindow(path);
      return Promise.resolve();
    }

    if (isReplace) {
      return replace(to);
    }
    return push(to);
  }

  /**
   * @description 路由跳转
   * @description Route jump
   *
   * @param key
   * @param options
   */
  function goKey(key: RouteKey, options?: GoOption) {
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
   * @description 返回上一页
   * @description Return to the previous page
   */
  function goBack() {
    routerGo(-1);
  }

  /**
   * @description 跳转首页
   * @description Jump to the homepage
   */
  function goHome() {
    return goKey('root');
  }

  /**
   * @description 跳转登录页面
   * @description Jump to the login page
   *
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
   * @description: 切换登录模块
   * @description Toggle login module
   *
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

  /**
   * @description: 跳转重定向页面
   * @description Redirect to the redirect page
   */
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
    routerPush: push,
    routerBack: back,
  };
}

// /**
//  * @description 重新加载当前页面 弃用
//  * @description: redo current page
//  *
//  * @param _router
//  */
// export const useRedo = (_router?: Router) => {
//   const { replace, currentRoute } = _router || useRouter();
//   const { query, params = {}, name, fullPath } = unref(currentRoute.value);
//
//   function redo(): Promise<boolean> {
//     return new Promise((resolve) => {
//       if (name === PageEnum.REDIRECT) {
//         resolve(false);
//         return;
//       }
//       if (name && Object.keys(params).length > 0) {
//         params._originParams = JSON.stringify(params ?? {});
//         params._redirectType = 'name';
//         params.path = String(name);
//       } else {
//         params._redirectType = 'path';
//         params.path = fullPath;
//       }
//       replace({ name: PageEnum.REDIRECT, params, query }).then(() =>
//         resolve(true),
//       );
//     });
//   }
//
//   return redo;
// };
