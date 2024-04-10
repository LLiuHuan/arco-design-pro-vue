import { RouteLocationNormalized, RouteLocationRaw, Router } from 'vue-router';
import { unref } from 'vue';
import { appSetting } from '@/settings';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY, PageEnum } from '@/enums';
import { store } from '@/store';
import { clearTabRoutes } from '@/store/modules/multipleTab/helpers';
import { localStg } from '@/utils/cache';
import { getRawRoute } from '@/utils/router';
import { useGo, useRedo } from '@/hooks/web/usePage';

export interface MultipleTabState {
  cacheTabList: Set<string>;
  tabList: RouteLocationNormalized[];
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
    getTabList(state): RouteLocationNormalized[] {
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
        const item = getRawRoute(tab);
        // Ignore the cache
        const needCache = !item.meta?.ignoreKeepAlive;
        if (!needCache) {
          // eslint-disable-next-line no-continue
          continue;
        }
        const name = item.name as string;
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
        const p = page.fullPath || page.path;
        if (p) {
          toPath = p;
        }
      }
      // Jump to the current page and report an error
      if (path !== toPath) go(toPath as PageEnum, true);
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
  },
});

// Need to be used outside the setup
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
