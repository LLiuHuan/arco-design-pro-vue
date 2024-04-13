import { RouteLocationRaw, Router } from 'vue-router';
import { toRaw, unref } from 'vue';
import { appSetting } from '@/settings';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY, PageEnum } from '@/enums';
import { store } from '@/store';
import { localStg } from '@/utils/cache';
import { useGo, useRedo } from '@/hooks/web/usePage';
import { App } from '~/types/app';
import { useAuthStore } from '@/store/modules/auth';
import { clearTabRoutes, getTabRouteByVueRoute } from './helpers';

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: App.Tab[];
  lastDragEndIndex: number;
}

export type PathAsPageEnum<T> = T extends { path: string }
  ? T & { path: PageEnum }
  : T;
export type RouteLocationRawEx = PathAsPageEnum<RouteLocationRaw>;

export enum GoType {
  'replace',
  'after',
}

function handleGotoPage(router: Router) {
  const { go } = useGo(router);
  go(unref(router.currentRoute).fullPath, true);
}

const getToTarget = (tabItem: App.Tab) => {
  const { params, fullPath, query } = tabItem;
  return {
    params: params || {},
    path: fullPath,
    query: query || {},
  };
};

const cacheTab = appSetting.multiTabsSetting.cache;

export const useMultipleTabStore = defineStore({
  id: 'store-multiple-tab',
  state: (): MultipleTabState => ({
    // Tabs that need to be cached - [需要缓存的标签]
    cacheTabList: new Set(),
    // multiple tab list - [多标签页列表]
    tabList: cacheTab ? localStg.get(MULTIPLE_TABS_KEY) || [] : [],
    // Index of the last moved tab - [最后一次移动标签的索引]
    lastDragEndIndex: 0,
  }),
  getters: {
    // Get the tab list - [获取标签列表]
    getTabList(state): App.Tab[] {
      return state.tabList;
    },
    // Get the cached tab list - [获取缓存的标签列表]
    getCachedTabList(state): string[] {
      return Array.from(state.cacheTabList);
    },
    // Get the last moved tab index - [获取最后一次移动标签的索引]
    getLastDragEndIndex(state): number {
      return state.lastDragEndIndex;
    },
  },
  actions: {
    /**
     * @description Reset the state - [重置状态]
     */
    resetTabStore(): void {
      clearTabRoutes();
      // this.clearCacheTabs();
      this.$reset();
    },
    /**
     * @description Update the cache according to the currently opened tabs - [根据当前打开的标签更新缓存]
     */
    async updateCacheTab() {
      const cacheMap: Set<string> = new Set();

      for (const tab of this.tabList) {
        // Ignore the cache
        const needCache = !tab.meta?.ignoreKeepAlive;
        if (!needCache) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const name = tab.name as string;
        cacheMap.add(name);
      }
      this.cacheTabList = cacheMap;
    },
    /**
     * Refresh tabs - [刷新标签]
     */
    async refreshPage(router: Router) {
      const { currentRoute } = router;
      const route = unref(currentRoute);
      const { name } = route;

      const findTab = this.getCachedTabList.find((item) => item === name);
      if (findTab) {
        this.cacheTabList.delete(findTab);
      }
      const redo = useRedo(router);
      await redo();
    },
    /**
     * @description Clear the cache - [清空缓存]
     */
    clearCacheTabs(): void {
      this.cacheTabList = new Set();
    },
    /**
     * @description Add a new tab - [添加新标签]
     * @param router
     */
    goToPage(router: Router) {
      const { go } = useGo(router);
      const len = this.tabList.length;
      const { path } = unref(router.currentRoute);

      let toPath: PageEnum | string = PageEnum.BASE_HOME;

      if (len > 0) {
        const page = this.tabList[len - 1];
        const p = page.fullPath;
        if (p) {
          toPath = p;
        }
      }
      // Jump to the current page and report an error
      if (path !== toPath) go(toPath as PageEnum, true);
    },

    /**
     * @description Close tabs in bulk - [批量关闭标签]
     */
    async bulkCloseTabs(pathList: string[]) {
      this.tabList = this.tabList.filter(
        (item) => !pathList.includes(item.fullPath),
      );
    },

    /**
     * @description Close tab - [关闭标签]
     * @param tab
     * @param router
     */
    async closeTab(tab: App.Tab, router: Router) {
      const close = (route: App.Tab) => {
        const { fullPath, meta: { affix } = {} } = route;
        if (affix) {
          return;
        }

        const index = this.tabList.findIndex(
          (item) => item.fullPath === fullPath,
        );
        if (index !== -1) this.tabList.splice(index, 1);
      };

      const { currentRoute, replace } = router;

      const { fullPath } = unref(currentRoute);
      if (fullPath !== tab.fullPath) {
        // Closed is not the activation tab
        close(tab);
        this.updateCacheTab();
        return;
      }

      // Closed is activated atb
      let toTarget: RouteLocationRaw = {};

      const index = this.tabList.findIndex(
        (item) => item.fullPath === fullPath,
      );

      // If the current is the leftmost tab
      if (index === 0) {
        // There is only one tab, then jump to the homepage, otherwise jump to the right tab
        if (this.tabList.length === 1) {
          const userStore = useAuthStore();
          toTarget = userStore.getUserInfo.homeName || PageEnum.BASE;
        } else {
          //  Jump to the right tab
          const page = this.tabList[index + 1];
          toTarget = getToTarget(page);
        }
      } else {
        // Close the current tab
        const page = this.tabList[index - 1];
        toTarget = getToTarget(page);
      }
      const currentTab = getTabRouteByVueRoute(currentRoute.value);
      close(currentTab);
      await replace(toTarget);
    },

    /**
     * @description Close all tabs - [关闭所有标签]
     * @param router
     */
    async closeAllTab(router: Router) {
      this.tabList = this.tabList.filter((item) => item?.meta?.affix ?? false);
      this.clearCacheTabs();
      this.goToPage(router);
    },

    /**
     * @description Close left tabs - [关闭左侧标签]
     * @param route
     * @param router
     */
    async closeLeftTabs(route: App.Tab, router: Router) {
      const index = this.tabList.findIndex(
        (item) => item.fullPath === route.fullPath,
      );

      if (index > 0) {
        const leftTabs = this.tabList.slice(0, index);
        const pathList: string[] = [];
        for (const item of leftTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        await this.bulkCloseTabs(pathList);
      }
      await this.updateCacheTab();
      handleGotoPage(router);
    },

    // Close the tab on the left and jump
    async closeRightTabs(route: App.Tab, router: Router) {
      const index = this.tabList.findIndex(
        (item) => item.fullPath === route.fullPath,
      );

      if (index >= 0 && index < this.tabList.length - 1) {
        const rightTabs = this.tabList.slice(index + 1, this.tabList.length);

        const pathList: string[] = [];
        for (const item of rightTabs) {
          const affix = item?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(item.fullPath);
          }
        }
        await this.bulkCloseTabs(pathList);
      }
      await this.updateCacheTab();
      handleGotoPage(router);
    },

    /**
     * Close other tabs
     */
    async closeOtherTabs(route: App.Tab, router: Router) {
      const closePathList = this.tabList.map((item) => item.fullPath);

      const pathList: string[] = [];

      for (const path of closePathList) {
        if (path !== route.fullPath) {
          const closeItem = this.tabList.find((item) => item.fullPath === path);
          // eslint-disable-next-line no-continue
          if (!closeItem) continue;

          const affix = closeItem?.meta?.affix ?? false;
          if (!affix) {
            pathList.push(closeItem.fullPath);
          }
        }
      }
      await this.bulkCloseTabs(pathList);
      await this.updateCacheTab();
      localStg.set(MULTIPLE_TABS_KEY, this.tabList);
      handleGotoPage(router);
    },

    /**
     * @description Close tab by key - [通过key关闭标签]
     * @param key
     * @param router
     */
    async closeTabByKey(key: string, router: Router) {
      const index = this.tabList.findIndex((item) => item.fullPath === key);
      if (index !== -1) {
        await this.closeTab(this.tabList[index], router);
        const { currentRoute, replace } = router;
        // 检查当前路由是否存在于tabList中
        const isActivated = this.tabList.findIndex((item) => {
          return item.fullPath === currentRoute.value.fullPath;
        });
        // 如果当前路由不存在于TabList中，尝试切换到其它路由
        if (isActivated === -1) {
          let pageIndex;
          if (index > 0) {
            pageIndex = index - 1;
          } else if (index < this.tabList.length - 1) {
            pageIndex = index + 1;
          } else {
            pageIndex = -1;
          }

          if (pageIndex >= 0) {
            const page = this.tabList[index - 1];
            const toTarget = getToTarget(page);
            await replace(toTarget);
          }
        }
      }
    },

    /**
     * @description Sort the tabs - [排序标签]
     * @param oldIndex
     * @param newIndex
     */
    async sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex];
      this.tabList.splice(oldIndex, 1);
      this.tabList.splice(newIndex, 0, currentTab);
      this.lastDragEndIndex += 1;
    },

    async addTab(tab: App.Tab) {
      // 404  The page does not need to add a tab
      if (
        // path === PageEnum.ERROR_PAGE ||
        // path === PageEnum.BASE_LOGIN ||
        !tab.name ||
        ['redirect', 'not-found'].includes(tab.name as string)
      ) {
        return;
      }

      let updateIndex = -1;
      // Existing pages, do not add tabs repeatedly
      // 现有页面，请勿重复添加标签
      const tabHasExits = this.tabList.some((tabItem, index) => {
        updateIndex = index;
        return tabItem.fullPath === tab.fullPath;
      });

      // If the tab already exists, perform the update operation
      if (tabHasExits) {
        const curTab = toRaw(this.tabList)[updateIndex];
        if (!curTab) {
          return;
        }
        curTab.params = tab.params || curTab.params;
        curTab.query = tab.query || curTab.query;
        curTab.fullPath = tab.fullPath || curTab.fullPath;
        this.tabList.splice(updateIndex, 1, curTab);
      } else {
        // Add tab
        // 获取动态路由打开数，超过 0 即代表需要控制打开数
        // const dynamicLevel = meta?.dynamicLevel ?? -1;
        // if (dynamicLevel > 0) {
        //   // 如果动态路由层级大于 0 了，那么就要限制该路由的打开数限制了
        //   // 首先获取到真实的路由，使用配置方式减少计算开销.
        //   // const realName: string = path.match(/(\S*)\//)![1];
        //   const realPath = meta?.realPath ?? '';
        //   // 获取到已经打开的动态路由数, 判断是否大于某一个值
        //   if (
        //     this.tabList.filter((e) => e.meta?.realPath ?? realPath === '')
        //       .length >= dynamicLevel
        //   ) {
        //     // 关闭第一个
        //     const index = this.tabList.findIndex(
        //       (item) => item.meta.realPath === realPath,
        //     );
        //     if (index !== -1) this.tabList.splice(index, 1);
        //   }
        // }
        this.tabList.push(tab);
      }
      this.updateCacheTab();
      if (cacheTab) localStg.set(MULTIPLE_TABS_KEY, this.tabList);
    },

    /**
     * @description Set tab's title - [设置标签标题]
     *
     */
    async setTabTitle(title: string, tab: App.Tab) {
      const findTab = this.getTabList.find((item) => item === tab);
      if (findTab) {
        findTab.meta.title = title;
        await this.updateCacheTab();
      }
    },

    /**
     * @description replace tab's path
     */
    async updateTabPath(fullPath: string, route: App.Tab) {
      const findTab = this.getTabList.find((item) => item === route);
      if (findTab) {
        findTab.fullPath = fullPath;
        await this.updateCacheTab();
      }
    },
  },
});

// Need to be used outside the setup
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
