import { defineStore } from 'pinia';
import { store } from '@/store';
import { RouteRecordRaw, useRoute } from 'vue-router';
import {
  fetchGetConstantRoutes,
  fetchGetUserRoutes,
  fetchIsRouteExist,
} from '@/api/auth/route';
import { useMultipleTabStore } from '@/store/modules/multipleTab';
import { createStaticRoutes, getAuthVueRoutes } from '@/router/routes';
import type {
  ElegantConstRoute,
  LastLevelRouteKey,
  RouteKey,
  RouteMap,
} from '@elegant-router/types';
import { getRouteName, getRoutePath } from '@/router/elegant/transform';
import { ROOT_ROUTE } from '@/router/routes/builtin';
import { router } from '@/router';
import { useAuthStore } from '../auth';
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
  routeHome: LastLevelRouteKey;
  /** 常量路由 */
  constantRoutes: ElegantConstRoute[];
  /** 权限路由 */
  authRoutes: ElegantConstRoute[];
  /** 缓存路由 */
  cacheRoutes: RouteKey[];
  /** 所有缓存路由 */
  allCacheRoutes: RouteKey[];
  /** 移除路由函数 */
  removeRouteFns: (() => void)[];
}

const route = useRoute();

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
      return getBreadcrumbsByRoute(route, state.menus);
    },
  },
  actions: {
    /**
     * @description 设置路由首页
     * @description Set route home
     *
     * @param routeKey Route key - [路由key]
     */
    setRouteHome(routeKey: LastLevelRouteKey) {
      this.routeHome = routeKey;
    },
    /**
     * @description 添加固定路由
     * @description Add constant routes
     *
     * @param routes - [路由]
     */
    addConstantRoutes(routes: ElegantConstRoute[]) {
      const constantRoutesMap = new Map<string, ElegantConstRoute>([]);

      routes.forEach((routeItem) => {
        constantRoutesMap.set(routeItem.name, routeItem);
      });

      this.constantRoutes = Array.from(constantRoutesMap.values());
    },
    isConstantRoute(routeName: string) {
      return this.constantRoutes.some(
        (routeItem) => routeItem.name === routeName,
      );
    },
    /**
     * @description 添加权限路由
     * @description Add auth routes
     *
     * @param routes - [路由]
     */
    addAuthRoutes(routes: ElegantConstRoute[]) {
      const authRoutesMap = new Map<string, ElegantConstRoute>([]);

      routes.forEach((routeItem) => {
        authRoutesMap.set(routeItem.name, routeItem);
      });

      this.authRoutes = Array.from(authRoutesMap.values());
    },

    /**
     * @description 获取全局菜单
     * @description  Get global menus
     *
     * @param routes
     */
    getGlobalMenus(routes: ElegantConstRoute[]) {
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
    addCacheRoutes(routeKey: RouteKey) {
      if (this.cacheRoutes.includes(routeKey)) return;

      this.cacheRoutes.push(routeKey);
    },
    /**
     * @description 移除缓存路由
     * @description Remove cache routes
     *
     * @param routeKey - [路由key]
     */
    removeCacheRoutes(routeKey: RouteKey) {
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
    isCachedRoute(routeKey: RouteKey) {
      return this.allCacheRoutes.includes(routeKey);
    },
    /**
     * @description 重置路由缓存
     * @description Re cache routes by route key
     *
     * @param routeKey - [路由key]
     */
    async reCacheRoutesByKey(routeKey: RouteKey) {
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
    async reCacheRoutesByKeys(routeKeys: RouteKey[]) {
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
        console.log(staticAuthRoutes);
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
        const authStore = useAuthStore();
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
      const vueRoutes = getAuthVueRoutes(sortRoutes);

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
      routes.forEach((routeItem) => {
        const removeFn = router.addRoute(routeItem);
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
    handleUpdateRootRouteRedirect(redirectKey: LastLevelRouteKey) {
      const redirect = getRoutePath(redirectKey);

      if (redirect) {
        const rootRoute: ElegantConstRoute = { ...ROOT_ROUTE, redirect };

        router.removeRoute(rootRoute.name);

        const [rootVueRoute] = getAuthVueRoutes([rootRoute]);
        router.addRoute(rootVueRoute);
      }
    },
    /**
     * @description 获取 auth 路由是否存在
     * @description Get is auth route exist
     *
     * @param routePath Route path - [路由路径]
     */
    async getIsAuthRouteExist(routePath: RouteMap[RouteKey]) {
      const routeName = getRouteName(routePath);

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

      return (
        allRoutes.find((routeItem) => routeItem.name === key)?.meta || null
      );
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
