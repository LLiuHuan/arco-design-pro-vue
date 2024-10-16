import { defineStore } from 'pinia';
import { RouteRecordRaw, useRouter } from 'vue-router';
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
// import { router } from '@/router';
import { StoreEnum } from '@/enums';
import { useBoolean } from '@adp/hooks';
import { computed, ref, shallowRef } from 'vue';
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
import { useAuthStore } from '../auth';

export const useRouteStore = defineStore(StoreEnum.Route, () => {
  const authStore = useAuthStore();
  const router = useRouter();

  const { bool: isInitConstantRoute, setBool: setIsInitConstantRoute } =
    useBoolean();
  const { bool: isInitAuthRoute, setBool: setIsInitAuthRoute } = useBoolean();

  // 权限路由模式
  const authRouteMode = ref(import.meta.env.VITE_AUTH_ROUTE_MODE);

  const removeRouteFns: (() => void)[] = [];

  /**
   * @description 重置Vue路由
   * @description Reset Vue routes
   */
  function resetVueRoutes() {
    removeRouteFns.forEach((fn) => fn());
    removeRouteFns.length = 0;
  }

  // region 路由首页相关

  // 路由首页
  const routeHome = ref(import.meta.env.VITE_ROUTE_HOME_PATH);

  /**
   * @description 设置路由首页
   * @description Set route home
   *
   * @param routeKey Route key - [路由key]
   */
  function setRouteHome(routeKey: LastLevelRouteKey) {
    routeHome.value = routeKey;
  }

  // endregion

  // region 固定路由/权限路由相关
  const constantRoutes = shallowRef<ElegantConstRoute[]>([]);
  const authRoutes = shallowRef<ElegantConstRoute[]>([]);

  /**
   * @description 添加固定路由
   * @description Add constant routes
   *
   * @param routes - [路由]
   */
  function addConstantRoutes(routes: ElegantConstRoute[]) {
    const constantRoutesMap = new Map<string, ElegantConstRoute>([]);

    routes.forEach((routeItem) => {
      constantRoutesMap.set(routeItem.name, routeItem);
    });

    constantRoutes.value = Array.from(constantRoutesMap.values());
  }

  /**
   * @description 添加权限路由
   * @description Add auth routes
   *
   * @param routes - [路由]
   */
  function addAuthRoutes(routes: ElegantConstRoute[]) {
    const authRoutesMap = new Map<string, ElegantConstRoute>([]);

    routes.forEach((routeItem) => {
      authRoutesMap.set(routeItem.name, routeItem);
    });

    authRoutes.value = Array.from(authRoutesMap.values());
  }

  // endregion

  // region 菜单相关
  const menus = ref<App.Menu[]>([]);
  const searchMenus = computed(() => transformMenuToSearchMenus(menus.value));

  const breadcrumbs = computed(() =>
    getBreadcrumbsByRoute(router.currentRoute.value, menus.value),
  );

  /**
   * @description 获取全局菜单
   * @description  Get global menus
   *
   * @param routes
   */
  function getGlobalMenus(routes: ElegantConstRoute[]) {
    menus.value = getGlobalMenusByAuthRoutes(routes);
  }

  /**
   * @description 更新全局菜单的国际化
   * @description Update locale of global menus
   */
  function updateGlobalMenusByLocale() {
    menus.value = updateLocaleOfGlobalMenus(menus.value);
  }

  // endregion

  // region 缓存路由相关
  // 缓存路由
  const cacheRoutes = ref<RouteKey[]>([]);
  // 所有缓存路由
  const allCacheRoutes = shallowRef<RouteKey[]>([]);

  /**
   * @description 获取缓存路由
   * @description Get cache routes
   *
   * @param routes Vue routes - [Vue 路由]
   */
  function getCacheRoutes(routes: RouteRecordRaw[]) {
    const all = getCacheRouteNames(routes);

    cacheRoutes.value = all;
    allCacheRoutes.value = [...all];
  }

  /**
   * @description 添加缓存路由
   * @description Add cache routes
   *
   * @param routeKey - [路由key]
   */
  function addCacheRoutes(routeKey: RouteKey) {
    if (cacheRoutes.value.includes(routeKey)) return;

    cacheRoutes.value.push(routeKey);
  }

  /**
   * @description 移除缓存路由
   * @description Remove cache routes
   *
   * @param routeKey - [路由key]
   */
  function removeCacheRoutes(routeKey: RouteKey) {
    const index = cacheRoutes.value.findIndex((item) => item === routeKey);

    if (index === -1) return;

    cacheRoutes.value.splice(index, 1);
  }

  /**
   * @description 是否是缓存路由
   * @description Is cached route
   *
   * @param routeKey - [路由key]
   */
  function isCachedRoute(routeKey: RouteKey) {
    return allCacheRoutes.value.includes(routeKey);
  }

  /**
   * @description 重置路由缓存
   * @description Re cache routes by route key
   *
   * @param routeKey - [路由key]
   */
  async function reCacheRoutesByKey(routeKey: RouteKey) {
    if (!isCachedRoute(routeKey)) return;

    removeCacheRoutes(routeKey);

    // await appStore.reloadPage();

    addCacheRoutes(routeKey);
  }

  /**
   * @description 重置路由缓存
   * @description Re cache routes by route keys
   *
   * @param routeKeys - [路由keys]
   */
  async function reCacheRoutesByKeys(routeKeys: RouteKey[]) {
    for await (const key of routeKeys) {
      await reCacheRoutesByKey(key);
    }
  }

  // endregion

  // region 其他

  /**
   * @description 获取 auth 路由是否存在
   * @description Get is auth route exist
   *
   * @param routePath Route path - [路由路径]
   */
  async function getIsAuthRouteExist(routePath: RouteMap[RouteKey]) {
    const routeName = getRouteName(routePath);

    if (!routeName) {
      return false;
    }

    if (authRouteMode.value === 'static') {
      const { authRoutes: staticAuthRoutes } = createStaticRoutes();
      return isRouteExistByRouteName(routeName, staticAuthRoutes);
    }

    const data = fetchIsRouteExist(routeName);
    return data;
  }

  /**
   * @description 获取选中菜单的key路径
   * @description Get selected menu key path
   *
   * @param selectedKey Selected menu key - [选中的菜单key]
   */
  function getSelectedMenuKeyPath(selectedKey: string) {
    return getSelectedMenuKeyPathByKey(selectedKey, menus.value);
  }

  /**
   * @description 获取路由meta
   * @description Get route meta by key
   *
   * @param key Route key
   */
  function getRouteMetaByKey(key: string) {
    const allRoutes = router.getRoutes();

    return allRoutes.find((routeItem) => routeItem.name === key)?.meta || null;
  }

  /**
   * @description 获取路由meta的query
   * @description Get route query of meta by key
   *
   * @param key
   */
  function getRouteQueryOfMetaByKey(key: string) {
    const meta = getRouteMetaByKey(key);

    const query: Record<string, string> = {};

    meta?.query?.forEach((item) => {
      query[item.key] = item.value;
    });

    return query;
  }

  // endregion

  // region 初始化相关

  /**
   * @description 添加移除路由函数
   * @description Add remove route fn
   *
   * @param fn
   */
  function addRemoveRouteFn(fn: () => void) {
    removeRouteFns.push(fn);
  }

  /**
   * @description 添加路由到vue router
   * @description Add routes to vue router
   *
   * @param routes Vue routes
   */
  function addRoutesToVueRouter(routes: RouteRecordRaw[]) {
    routes.forEach((routeItem) => {
      const removeFn = router.addRoute(routeItem);
      addRemoveRouteFn(removeFn);
    });
  }

  /**
   * @description 处理常量和权限路由
   * @description Handle constant and auth routes
   */
  function handleConstantAndAuthRoutes() {
    const allRoutes = [...constantRoutes.value, ...authRoutes.value];

    const sortRoutes = sortRoutesByOrder(allRoutes);

    // const vueRoutes = getAuthVueRoutes(sortRoutes);
    const vueRoutes = getAuthVueRoutes(sortRoutes);
    // 重置Vue路由
    resetVueRoutes();

    // 设置vueRoutes
    addRoutesToVueRouter(vueRoutes);
    // 设置menus
    getGlobalMenus(sortRoutes);

    // 设置缓存路由
    getCacheRoutes(vueRoutes);
  }

  /**
   * @description 当身份验证路由模式为动态时更新根路由重定向
   * @description Update root route redirect when auth route mode is dynamic
   *
   * @param redirectKey Redirect route key - [重定向路由key]
   */
  function handleUpdateRootRouteRedirect(redirectKey: LastLevelRouteKey) {
    const redirect = getRoutePath(redirectKey);

    if (redirect) {
      const rootRoute: ElegantConstRoute = { ...ROOT_ROUTE, redirect };

      router.removeRoute(rootRoute.name);

      const [rootVueRoute] = getAuthVueRoutes([rootRoute]);
      router.addRoute(rootVueRoute);
    }
  }

  /**
   * @description 初始化常量路由
   * @description Initialize constant route
   */
  async function initConstantRoute() {
    if (isInitConstantRoute.value) return;

    const staticRoute = createStaticRoutes();
    if (authRouteMode.value === 'static') {
      addConstantRoutes(staticRoute.constantRoutes);
    } else {
      const data = await fetchGetConstantRoutes();

      if (data) {
        addConstantRoutes(data);
      } else {
        // if fetch constant routes failed, use static constant routes
        addConstantRoutes(staticRoute.constantRoutes);
      }
    }
    handleConstantAndAuthRoutes();

    setIsInitConstantRoute(true);
  }

  /**
   * @description 初始化静态权限路由
   * @description Initialize static auth route
   */
  function initStaticAuthRoute() {
    const { authRoutes: staticAuthRoutes } = createStaticRoutes();

    if (authStore.isStaticSuper) {
      addAuthRoutes(staticAuthRoutes);
    } else {
      const filteredAuthRoutes = filterAuthRoutesByRoles(
        staticAuthRoutes,
        authStore.userInfo.userRole,
      );

      addAuthRoutes(filteredAuthRoutes);
    }

    handleConstantAndAuthRoutes();

    setIsInitAuthRoute(true);
  }

  /**
   * @description 初始化动态权限路由
   * @description Initialize dynamic auth route
   */
  async function initDynamicAuthRoute() {
    const data = await fetchGetUserRoutes();

    if (data) {
      const { routes, home } = data;

      addAuthRoutes(routes);

      handleConstantAndAuthRoutes();

      setRouteHome(home);

      handleUpdateRootRouteRedirect(home);

      setIsInitAuthRoute(true);
    } else {
      // if fetch user routes failed, reset store
      authStore.resetStore();
    }
  }

  /**
   * @description 初始化权限路由
   * @description Initialize auth route
   */
  async function initAuthRoute() {
    const tabStore = useMultipleTabStore();
    if (authRouteMode.value === 'static') {
      initStaticAuthRoute();
    } else {
      await initDynamicAuthRoute();
    }

    tabStore.initHomeTab();
  }

  // endregion

  // region 重置相关

  /**
   * @description 重置
   * @description Reset store
   */
  async function resetStore() {
    const routeStore = useRouteStore();

    routeStore.$reset();

    resetVueRoutes();

    // after reset store, need to re-init constant route
    await initConstantRoute();
  }

  // endregion

  return {
    resetStore,
    routeHome,
    menus,
    searchMenus,
    updateGlobalMenusByLocale,
    cacheRoutes,
    reCacheRoutesByKey,
    reCacheRoutesByKeys,
    breadcrumbs,
    initConstantRoute,
    isInitConstantRoute,
    initAuthRoute,
    isInitAuthRoute,
    setIsInitAuthRoute,
    getIsAuthRouteExist,
    getSelectedMenuKeyPath,
    getRouteQueryOfMetaByKey,
  };
});
