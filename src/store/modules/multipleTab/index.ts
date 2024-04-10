import {
  RouteLocationNormalized,
  RouteLocationRaw,
  Router,
  useRouter,
} from 'vue-router';
import { unref } from 'vue';
import { appSetting } from '@/settings';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY, PageEnum } from '@/enums';
import { store } from '@/store';
import { REDIRECT_NAME } from '@/router/common';
import { clearTabRoutes } from '@/store/modules/multipleTab/helpers';
import { localStg } from '@/utils/cache';
import { getRawRoute } from '@/utils/router';
import { consoleError, isHttpUrl, openWindow } from '@/utils/common';

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
      await this.Redo(router);
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
      if (path !== toPath) this.Go(toPath as PageEnum, true, router);
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

    /**
     * @description Go to the specified route - [跳转到指定路由]
     * @param opt
     * @param goTypeOrIsReplace
     * @param _router
     * @constructor
     */
    async Go(
      opt: RouteLocationRawEx,
      goTypeOrIsReplace: boolean | GoType,
      _router?: Router,
    ) {
      if (!opt) {
        return;
      }
      const { push, replace, currentRoute } = _router || useRouter();

      let path = unref(opt) as string;
      if (path[0] === '/') {
        path = path.slice(1);
      }
      if (isHttpUrl(path)) {
        openWindow(path);
        return;
      }

      const isReplace =
        goTypeOrIsReplace === true || goTypeOrIsReplace === GoType.replace;
      const isAfter = goTypeOrIsReplace === GoType.after;

      if (isReplace) {
        replace(opt).catch(consoleError);
      } else if (isAfter) {
        // const tabStore = useMultipleTabStore();
        const currentName = unref(currentRoute).name;
        // 当前 tab
        const currentIndex = this.getTabList.findIndex(
          (item) => item.name === currentName,
        );
        // 当前 tab 数量
        const currentCount = this.getTabList.length;
        push(opt)
          .then(() => {
            if (this.getTabList.length > currentCount) {
              // 产生新 tab
              // 新 tab（也是最后一个）
              const targetIndex = this.getTabList.length - 1;
              // 新 tab 在 当前 tab 的后面
              if (currentIndex > -1 && targetIndex > currentIndex) {
                // 移动 tab
                this.sortTabs(targetIndex, currentIndex + 1);
              }
            }
          })
          .catch(consoleError);
      } else {
        push(opt).catch(consoleError);
      }
    },

    /**
     * @description Redo - [重做]
     * @param _router
     * @constructor
     */
    async Redo(_router: Router): Promise<boolean> {
      const { replace, currentRoute } = _router || useRouter();
      const { query, params = {}, name, fullPath } = unref(currentRoute.value);

      return new Promise((resolve) => {
        if (name === REDIRECT_NAME) {
          resolve(false);
          return;
        }
        if (name && Object.keys(params).length > 0) {
          params._origin_params = JSON.stringify(params ?? {});
          params._redirect_type = 'name';
          params.path = String(name);
        } else {
          params._redirect_type = 'path';
          params.path = fullPath;
        }
        replace({ name: REDIRECT_NAME, params, query }).then(() =>
          resolve(true),
        );
      });
    },
  },
});

// Need to be used outside the setup
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
