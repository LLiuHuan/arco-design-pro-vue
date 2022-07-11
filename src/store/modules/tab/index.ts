import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { defineStore } from 'pinia';
import { useThemeStore } from '@/store';
import { useRouterPush } from '@/composables';
// import { useThemeStore } from '../theme';
import {
  clearTabRoutes,
  getIndexInTabRoutes,
  getIndexInTabRoutesByRouteName,
  getTabRouteByVueRoute,
  getTabRoutes,
  isInTabRoutes,
  setTabRoutes,
} from './helpers';

interface TabState {
  /** 多页签数据 */
  tabs: GlobalTabRoute[];
  /** 多页签首页 */
  homeTab: GlobalTabRoute;
  /** 当前激活状态的页签(路由path) */
  activeTab: string;
}

export const useTabStore = defineStore('tab-store', {
  state: (): TabState => ({
    tabs: [],
    homeTab: {
      name: 'root',
      fullPath: '/',
      meta: {
        title: 'Root',
      },
      scrollPosition: {
        left: 0,
        top: 0,
      },
    },
    activeTab: '',
  }),
  getters: {
    /** 当前激活状态的页签索引 */
    activeTabIndex(state) {
      const { tabs, activeTab } = state;
      return tabs.findIndex((tab) => tab.fullPath === activeTab);
    },
  },
  actions: {
    /** 重置Tab状态 */
    resetTabStore() {
      clearTabRoutes();
      this.$reset();
    },
    /** 缓存页签路由数据 */
    cacheTabRoutes() {
      setTabRoutes(this.tabs);
    },
    /**
     * 设置当前路由对应的页签为激活状态
     * @param path - 路由path
     */
    setActiveTab(path: string) {
      this.activeTab = path;
    },
    /**
     * 设置当前路由对应的页签title
     * @param title - tab名称
     */
    setActiveTabTitle(title: string) {
      const item = this.tabs.find((tab) => tab.fullPath === this.activeTab);
      if (item) {
        item.meta.title = title;
      }
    },
    /**
     * 初始化首页页签路由
     * @param routeHomeName - 路由首页的name
     * @param router - 路由实例
     */
    initHomeTab(routeHomeName: string, router: Router) {
      const routes = router.getRoutes();
      const findHome = routes.find((item) => item.name === routeHomeName);
      if (findHome && !findHome.children.length) {
        // 有子路由的不能作为Tab
        this.homeTab = getTabRouteByVueRoute(findHome);
      }
    },
    /**
     * 添加多页签
     * @param route - 路由
     */
    addTab(route: RouteLocationNormalizedLoaded) {
      const tab = getTabRouteByVueRoute(route);

      // 如果已经存在于多页签中，则不添加
      if (isInTabRoutes(this.tabs, route.fullPath)) return;

      const index = getIndexInTabRoutesByRouteName(this.tabs, route.name as string);

      if (index === -1) {
        this.tabs.push(tab);
        return;
      }

      const { multiTab = false } = route.meta;
      if (!multiTab) {
        this.tabs.splice(index, 1, tab);
        return;
      }

      this.tabs.push(tab);
    },
    /**
     * 删除多页签
     * @param path - 路由path
     */
    removeTab(path: string) {
      const { routerPush } = useRouterPush(false);
      const isActive = this.activeTab === path;
      const updateTabs = this.tabs.filter((tab) => tab.fullPath !== path);
      this.tabs = updateTabs;
      if (isActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        this.setActiveTab(activePath);
        routerPush(activePath);
      }
    },
    /**
     * 清空多页签(多页签首页保留)
     * @param excludes - 保留的多页签path
     */
    clearTab(excludes: string[] = []) {
      const { routerPush } = useRouterPush(false);

      const homePath = this.homeTab.fullPath;
      const remain = [homePath, ...excludes];
      const hasActive = remain.includes(this.activeTab);
      const updateTabs = this.tabs.filter((tab) => remain.includes(tab.fullPath));
      this.tabs = updateTabs;
      if (!hasActive && updateTabs.length) {
        const activePath = updateTabs[updateTabs.length - 1].fullPath;
        this.setActiveTab(activePath);
        routerPush(activePath);
      }
    },
    /**
     * 清除左边多页签
     * @param path - 路由path
     */
    clearLeftTab(path: string) {
      const index = getIndexInTabRoutes(this.tabs, path);
      if (index > -1) {
        const excludes = this.tabs.slice(index).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /**
     * 清除右边多页签
     * @param path - 路由path
     */
    clearRightTab(path: string) {
      const index = getIndexInTabRoutes(this.tabs, path);
      if (index > -1) {
        const excludes = this.tabs.slice(0, index + 1).map((item) => item.fullPath);
        this.clearTab(excludes);
      }
    },
    /** 清除所有多页签 */
    clearAllTab() {
      this.clearTab();
    },
    /**
     * 点击单个tab
     * @param path - 路由path
     */
    handleClickTab(path: string) {
      const { routerPush } = useRouterPush(false);

      const isActive = this.activeTab === path;
      if (!isActive) {
        this.setActiveTab(path);
        routerPush(path);
      }
    },
    /**
     * 记录tab滚动位置 // 无用
     * @param path - 路由path
     * @param position - tab当前页的滚动位置
     */
    recordTabScrollPosition(path: string, position: { left: number; top: number }) {
      const index = getIndexInTabRoutes(this.tabs, path);
      if (index > -1) {
        this.tabs[index].scrollPosition = position;
      }
    },
    /**
     * 获取tab滚动位置 // 无用
     * @param path - 路由path
     */
    getTabScrollPosition(path: string) {
      const position = {
        left: 0,
        top: 0,
      };
      const index = getIndexInTabRoutes(this.tabs, path);
      if (index > -1) {
        Object.assign(position, this.tabs[index].scrollPosition);
      }
      return position;
    },

    /** 初始化Tab状态 */
    iniTabStore(currentRoute: RouteLocationNormalizedLoaded) {
      const theme = useThemeStore();

      const tabs: GlobalTabRoute[] = theme.tab.isCache ? getTabRoutes() : [];

      const hasHome = getIndexInTabRoutesByRouteName(tabs, this.homeTab.name as string) > -1;
      if (!hasHome && this.homeTab.name !== 'root') {
        tabs.unshift(this.homeTab);
      }

      const isHome = currentRoute.fullPath === this.homeTab.fullPath;
      const index = getIndexInTabRoutesByRouteName(tabs, currentRoute.name as string);
      if (!isHome) {
        const currentTab = getTabRouteByVueRoute(currentRoute);
        if (!currentRoute.meta.multiTab) {
          if (index > -1) {
            tabs.splice(index, 1, currentTab);
          } else {
            tabs.push(currentTab);
          }
        } else {
          const hasCurrent = isInTabRoutes(tabs, currentRoute.fullPath);
          if (!hasCurrent) {
            tabs.push(currentTab);
          }
        }
      }
      this.tabs = tabs;
      this.setActiveTab(currentRoute.fullPath);
    },
  },
});
