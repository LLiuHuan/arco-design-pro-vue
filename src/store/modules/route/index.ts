import { defineStore } from 'pinia';
import { createStaticRoutes, ROOT_ROUTE } from '@/router/routes';
import { store } from '@/store';
import { RouteRecordRaw } from 'vue-router';
import { router } from '@/router';
import {
  fetchGetConstantRoutes,
  fetchGetUserRoutes,
  fetchIsRouteExist,
} from '@/api/auth/route';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { useAuthStore } from '@/store/modules/auth';
import {
  transformAuthRouteToVueRoutes,
  transformRouteNameToRoutePath,
  transformRoutePathToRouteName,
} from '@/router/helper/transform';
import {
  filterAuthRoutesByRoles,
  getBreadcrumbsByRoute,
  getCacheRouteNames,
  getGlobalMenusByAuthRoutes,
  getSelectedMenuKeyPathByKey,
  isRouteExistByRouteName,
  sortRoutesByOrder,
  transformMenuToSearchMenus,
  updateLocaleOfGlobalMenus,
} from './helpers';

interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  /** 菜单列表 */
  menus: App.Menu[];
  /** 搜索的菜单 */
  searchMenus?: App.Menu[];
  /** 是否初始化了常量路由 */
  isInitConstantRoute: boolean;
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页 */
  routeHome: string;
  /** 常量路由 */
  constantRoutes: AuthRoute.ConstRoute[];
  /** 权限路由 */
  authRoutes: AuthRoute.ConstRoute[];
  /** 缓存路由 */
  cacheRoutes: PageRoute.RouteKey[];
  /** 所有缓存路由 */
  allCacheRoutes: PageRoute.RouteKey[];
  /** 移除路由函数 */
  removeRouteFns: (() => void)[];
}

const authStore = useAuthStore();

export const useRouteStore = defineStore({
  id: 'route-store',
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    menus: [],
    isInitConstantRoute: false,
    routeHome: import.meta.env.VITE_ROUTE_HOME_PATH,
    constantRoutes: [],
    authRoutes: [],
    cacheRoutes: [],
    allCacheRoutes: [],
    removeRouteFns: [],
  }),
  getters: {
    /**
     * @description Get the menu - [获取菜单]
     * @param state
     */
    getMenus(state) {
      return state.menus;
    },
    /**
     * @description Get isInitAuthRoute - [获取isInitAuthRoute]
     * @param state
     */
    getIsInitAuthRoute(state) {
      return state.isInitAuthRoute;
    },
    /**
     * @description 获取searchMenus
     * @description Get the searchMenus
     *
     * @param state
     */
    getSearchMenus(state) {
      return transformMenuToSearchMenus(state.menus);
    },
    getBreadcrumb(state) {
      return getBreadcrumbsByRoute(router.currentRoute.value, state.menus);
    },
  },
  actions: {
    /**
     * @description 设置路由首页
     * @description Set route home
     *
     * @param routeKey Route key - [路由key]
     */
    setRouteHome(routeKey: PageRoute.LastDegreeRouteKey) {
      this.routeHome = routeKey;
    },
    /**
     * @description 添加固定路由
     * @description Add constant routes
     *
     * @param routes - [路由]
     */
    addConstantRoutes(routes: AuthRoute.ConstRoute[]) {
      const constantRoutesMap = new Map<string, AuthRoute.ConstRoute>([]);

      routes.forEach((route) => {
        constantRoutesMap.set(route.name, route);
      });

      this.constantRoutes = Array.from(constantRoutesMap.values());
    },
    isConstantRoute(routeName: string) {
      return this.constantRoutes.some((route) => route.name === routeName);
    },
    /**
     * @description 添加权限路由
     * @description Add auth routes
     *
     * @param routes - [路由]
     */
    addAuthRoutes(routes: AuthRoute.ConstRoute[]) {
      const authRoutesMap = new Map<string, AuthRoute.ConstRoute>([]);

      routes.forEach((route) => {
        authRoutesMap.set(route.name, route);
      });

      this.authRoutes = Array.from(authRoutesMap.values());
    },

    /**
     * @description 获取全局菜单
     * @description  Get global menus
     *
     * @param routes
     */
    getGlobalMenus(routes: AuthRoute.ConstRoute[]) {
      this.menus = getGlobalMenusByAuthRoutes(routes);
    },
    /**
     * @description 更新全局菜单的国际化
     * @description Update locale of global menus
     */
    updateGlobalMenusByLocale() {
      this.menus = updateLocaleOfGlobalMenus(this.menus);
    },
    /**
     * @description 获取缓存路由
     * @description Get cache routes
     *
     * @param routes Vue routes - [Vue 路由]
     */
    getCacheRoutes(routes: RouteRecordRaw[]) {
      const all = getCacheRouteNames(routes);

      this.cacheRoutes = all;
      this.allCacheRoutes = [...all];
    },
    /**
     * @description 添加缓存路由
     * @description Add cache routes
     *
     * @param routeKey - [路由key]
     */
    addCacheRoutes(routeKey: PageRoute.RouteKey) {
      if (this.cacheRoutes.includes(routeKey)) return;

      this.cacheRoutes.push(routeKey);
    },
    /**
     * @description 移除缓存路由
     * @description Remove cache routes
     *
     * @param routeKey - [路由key]
     */
    removeCacheRoutes(routeKey: PageRoute.RouteKey) {
      const index = this.cacheRoutes.findIndex((item) => item === routeKey);

      if (index === -1) return;

      this.cacheRoutes.splice(index, 1);
    },
    /**
     * @description 是否是缓存路由
     * @description Is cached route
     *
     * @param routeKey - [路由key]
     */
    isCachedRoute(routeKey: PageRoute.RouteKey) {
      return this.allCacheRoutes.includes(routeKey);
    },
    /**
     * @description 重置路由缓存
     * @description Re cache routes by route key
     *
     * @param routeKey - [路由key]
     */
    async reCacheRoutesByKey(routeKey: PageRoute.RouteKey) {
      if (!this.isCachedRoute(routeKey)) return;

      this.removeCacheRoutes(routeKey);

      // await appStore.reloadPage();

      this.addCacheRoutes(routeKey);
    },
    /**
     * @description 重置路由缓存
     * @description Re cache routes by route keys
     *
     * @param routeKeys - [路由keys]
     */
    async reCacheRoutesByKeys(routeKeys: PageRoute.RouteKey[]) {
      for await (const key of routeKeys) {
        await this.reCacheRoutesByKey(key);
      }
    },
    /**
     * @description 重置
     * @description Reset store
     */
    async resetStore() {
      const routeStore = useRouteStore();

      routeStore.$reset();

      this.resetVueRoutes();

      // after reset store, need to re-init constant route
      await this.initConstantRoute();
    },
    /**
     * @description 重置Vue路由
     * @description Reset Vue routes
     */
    resetVueRoutes() {
      this.removeRouteFns.forEach((fn) => fn());
      this.removeRouteFns.length = 0;
    },
    /**
     * @description 初始化常量路由
     * @description Initialize constant route
     */
    async initConstantRoute() {
      if (this.isInitConstantRoute) return;

      const staticRoute = createStaticRoutes();

      if (this.authRouteMode === 'static') {
        this.addConstantRoutes(staticRoute.constantRoutes);
      } else {
        const data = await fetchGetConstantRoutes();

        if (data) {
          this.addConstantRoutes(data);
        } else {
          // if fetch constant routes failed, use static constant routes
          this.addConstantRoutes(staticRoute.constantRoutes);
        }
      }

      this.handleConstantAndAuthRoutes();

      this.isInitConstantRoute = true;
    },
    /**
     * @description 初始化权限路由
     * @description Initialize auth route
     */
    async initAuthRoute() {
      const tabStore = useMultipleTabStore();
      if (this.authRouteMode === 'static') {
        this.initStaticAuthRoute();
      } else {
        await this.initDynamicAuthRoute();
      }

      tabStore.initHomeTab();
    },
    /**
     * @description 初始化静态权限路由
     * @description Initialize static auth route
     */
    initStaticAuthRoute() {
      const authStore = useAuthStore();
      const { authRoutes: staticAuthRoutes } = createStaticRoutes();

      if (authStore.isStaticSuper) {
        this.addAuthRoutes(staticAuthRoutes);
      } else {
        const filteredAuthRoutes = filterAuthRoutesByRoles(
          staticAuthRoutes,
          authStore.roleList,
        );

        this.addAuthRoutes(filteredAuthRoutes);
      }

      this.handleConstantAndAuthRoutes();

      this.isInitAuthRoute = true;
    },
    /**
     * @description 初始化动态权限路由
     * @description Initialize dynamic auth route
     */
    async initDynamicAuthRoute() {
      const data = await fetchGetUserRoutes();

      if (data) {
        const { routes, home } = data;

        this.addAuthRoutes(routes);

        this.handleConstantAndAuthRoutes();

        this.setRouteHome(home);

        this.handleUpdateRootRouteRedirect(home);

        this.isInitAuthRoute = true;
      } else {
        // if fetch user routes failed, reset store
        authStore.resetStore();
      }
    },
    /**
     * @description 处理常量和权限路由
     * @description Handle constant and auth routes
     */
    handleConstantAndAuthRoutes() {
      const allRoutes = [...this.constantRoutes, ...this.authRoutes];

      const sortRoutes = sortRoutesByOrder(allRoutes);

      // const vueRoutes = getAuthVueRoutes(sortRoutes);
      const vueRoutes = transformAuthRouteToVueRoutes(sortRoutes);

      // 重置Vue路由
      this.resetVueRoutes();

      // 设置vueRoutes
      this.addRoutesToVueRouter(vueRoutes);

      // 设置menus
      this.getGlobalMenus(sortRoutes);

      // 设置缓存路由
      this.getCacheRoutes(vueRoutes);
    },
    /**
     * @description 添加路由到vue router
     * @description Add routes to vue router
     *
     * @param routes Vue routes
     */
    addRoutesToVueRouter(routes: RouteRecordRaw[]) {
      routes.forEach((route) => {
        const removeFn = router.addRoute(route);
        this.addRemoveRouteFn(removeFn);
      });
    },
    /**
     * @description 添加移除路由函数
     * @description Add remove route fn
     *
     * @param fn
     */
    addRemoveRouteFn(fn: () => void) {
      this.removeRouteFns.push(fn);
    },
    /**
     * @description 当身份验证路由模式为动态时更新根路由重定向
     * @description Update root route redirect when auth route mode is dynamic
     *
     * @param redirectKey Redirect route key - [重定向路由key]
     */
    handleUpdateRootRouteRedirect(redirectKey: PageRoute.LastDegreeRouteKey) {
      const redirect = transformRouteNameToRoutePath(redirectKey);

      if (redirect) {
        const rootRoute: AuthRoute.ConstRoute = { ...ROOT_ROUTE, redirect };

        router.removeRoute(rootRoute.name);

        const [rootVueRoute] = transformAuthRouteToVueRoutes([rootRoute]);

        router.addRoute(rootVueRoute);
      }
    },
    /**
     * @description 获取 auth 路由是否存在
     * @description Get is auth route exist
     *
     * @param routePath Route path - [路由路径]
     */
    async getIsAuthRouteExist(routePath: AuthRoute.RoutePath) {
      const routeName = transformRoutePathToRouteName(routePath);

      if (!routeName) {
        return false;
      }

      if (this.authRouteMode === 'static') {
        const { authRoutes: staticAuthRoutes } = createStaticRoutes();
        return isRouteExistByRouteName(routeName, staticAuthRoutes);
      }

      const data = await fetchIsRouteExist(routeName);

      return data;
    },
    /**
     * @description 获取选中菜单的key路径
     * @description Get selected menu key path
     *
     * @param selectedKey Selected menu key - [选中的菜单key]
     */
    getSelectedMenuKeyPath(selectedKey: string) {
      return getSelectedMenuKeyPathByKey(selectedKey, this.menus);
    },
    /**
     * @description 获取路由meta
     * @description Get route meta by key
     *
     * @param key Route key
     */
    getRouteMetaByKey(key: string) {
      const allRoutes = router.getRoutes();

      return allRoutes.find((route) => route.name === key)?.meta || null;
    },

    /**
     * @description 获取路由meta的query
     * @description Get route query of meta by key
     *
     * @param key
     */
    getRouteQueryOfMetaByKey(key: string) {
      const meta = this.getRouteMetaByKey(key);

      const query: Record<string, string> = {};

      meta?.query?.forEach((item) => {
        query[item.key] = item.value;
      });

      return query;
    },
  },

  // persist: {
  //   key: 'pinia-route-store',
  //   storage: localStorage,
  //   // paths: ['menus', 'searchMenus', 'cacheRoutes'],
  //   debug: true,
  // },
});

// // Need to be used outside the setup - [需要在设置之外使用]
export function useRouteStoreWithOut() {
  return useRouteStore(store);
}
