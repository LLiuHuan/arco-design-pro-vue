import { defineStore } from 'pinia';
import { CONSTANT_ROUTES } from '@/router/routes';
import {
  getConstantRouteNames,
  transformRoutePathToRouteName,
} from '@/utils/router';
import { store } from '@/store';
import { App } from '~/types/app';

interface RouteState {
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  authRouteMode: ImportMetaEnv['VITE_AUTH_ROUTE_MODE'];
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
  /** 路由首页name(前端静态路由时生效，后端动态路由该值会被后端返回的值覆盖) */
  routeHomeName: AuthRoute.AllRouteKey;
  /** 菜单列表 */
  menus: App.Menu[];
  /** 搜索的菜单 */
  searchMenus: AuthRoute.Route[];
  /** 缓存的路由名称 */
  cacheRoutes: string[];
}

export const useRouteStore = defineStore({
  id: 'route-store',
  state: (): RouteState => ({
    authRouteMode: import.meta.env.VITE_AUTH_ROUTE_MODE,
    isInitAuthRoute: false,
    routeHomeName: transformRoutePathToRouteName(
      import.meta.env.VITE_ROUTE_HOME_PATH,
    ),
    menus: [],
    searchMenus: [],
    cacheRoutes: [],
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
     * @description Get the searchMenus - [获取searchMenus]
     * @param state
     */
    getSearchMenus(state) {
      return state.searchMenus;
    },
  },
  actions: {
    setMenus(menus: App.Menu[]) {
      this.menus = menus;
    },
    setSearchMenus(searchMenus: AuthRoute.Route[]) {
      this.searchMenus = searchMenus;
    },
    setCacheRoutes(cacheRoutes: string[]) {
      this.cacheRoutes = cacheRoutes;
    },
    setIsInitAuthRoute(isInitAuthRoute: boolean) {
      this.isInitAuthRoute = isInitAuthRoute;
    },
    /**
     * @description Reset the store of the route - [重置路由的store]
     */
    resetRouteStore() {
      this.$reset();
    },
    /**
     * @description Whether it is a constant route - [是否是固定路由]
     * @param name 路由名称
     */
    isConstantRoute(name: AuthRoute.AllRouteKey) {
      const NOT_FOUND_PAGE_NAME: AuthRoute.NotFoundRouteKey = 'not-found';

      const constantRouteNames = getConstantRouteNames(CONSTANT_ROUTES);
      return constantRouteNames.includes(name) && name !== NOT_FOUND_PAGE_NAME;
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
