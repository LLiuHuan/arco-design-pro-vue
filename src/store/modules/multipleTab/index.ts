import { appSetting } from '@/settings';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY } from '@/enums';
import { store } from '@/store';
import { localStg } from '@/utils/cache';
import { useGo } from '@/hooks/web/usePage';
import { router } from '@/router';
import {
  extractTabsByAllRoutes,
  filterTabsById,
  filterTabsByIds,
  findTabByRouteName,
  getAllTabs,
  getDefaultHomeTab,
  getFixedTabIds,
  getTabByRoute,
  isTabInTabs,
  updateTabByI18nKey,
  updateTabsByI18nKey,
} from './helpers';
import AllRouteKey = AuthRoute.AllRouteKey;

export interface MultipleTabState {
  tabs: App.Tab[];
  homeTab?: App.Tab;
  activeTabId: string;
}

const cacheTab = appSetting.multiTabsSetting.cache;

export const useMultipleTabStore = defineStore({
  id: 'store-multiple-tab',
  state: (): MultipleTabState => ({
    // multiple tab list - [多标签页列表]
    tabs: cacheTab ? localStg.get(MULTIPLE_TABS_KEY) || [] : [],
    // Active tab - [激活的标签]
    activeTabId: '',
  }),
  getters: {
    /**
     * @description 获取标签列表
     * @description Get the tab list
     *
     * @param state
     */
    getTabs(state): App.Tab[] {
      return getAllTabs(state.tabs, state.homeTab);
    },
    /**
     * @description 获取激活的标签
     * @description Get the active tab
     *
     * @param state
     */
    getActiveTab(state): App.Tab | undefined {
      return state.tabs.find((tab) => tab.id === state.activeTabId);
    },
  },
  actions: {
    initHomeTab() {
      this.homeTab = getDefaultHomeTab(router, 'dashboard_analysis');
    },
    /**
     * @description 初始化多页签
     * @description Init tab store
     *
     * @param currentRoute Current route
     */
    initTabStore(currentRoute: App.TabRoute) {
      const storageTabs = localStg.get(MULTIPLE_TABS_KEY);

      if (cacheTab && storageTabs) {
        const extractedTabs = extractTabsByAllRoutes(router, storageTabs);
        this.tabs = updateTabsByI18nKey(extractedTabs);
      }

      this.addTab(currentRoute);
    },
    /**
     * @description 设置激活的标签
     * @description Set the active tab
     * @param id
     */
    setActiveTabId(id: string) {
      this.activeTabId = id;
    },
    /**
     * @description 添加多页签
     * @description Add tab
     *
     * @param route Tab route - [标签路由]
     * @param active Whether to activate the added tab - [是否激活添加的标签]
     */
    addTab(route: App.TabRoute, active = true) {
      const tab = getTabByRoute(route);

      const isHomeTab = tab.id === this.homeTab?.id;

      if (!isHomeTab && !isTabInTabs(tab.id, this.tabs)) {
        this.tabs.push(tab);
      }

      if (active) {
        this.setActiveTabId(tab.id);
      }

      // this.updateCacheTab();
      // this.setCacheTabs();
    },
    /**
     * @description 删除多页签
     * @description Remove tab
     *
     * @param tabId Tab id - [标签id]
     */
    async removeTab(tabId: string) {
      const isRemoveActiveTab = this.activeTabId === tabId;
      const updatedTabs = filterTabsById(tabId, this.tabs);

      if (!isRemoveActiveTab) {
        this.tabs = updatedTabs;
        return;
      }

      const activeTab = updatedTabs.at(-1) || this.homeTab;

      if (activeTab) {
        await this.switchRouteByTab(activeTab);
        this.tabs = updatedTabs;
      }
    },
    /**
     * @description 删除激活的tab
     * @description remove active tab
     */
    async removeActiveTab() {
      await this.removeTab(this.activeTabId);
    },
    /**
     * @description 通过路由名称删除tab
     * @description remove tab by route name
     *
     * @param routeName route name
     */
    async removeTabByRouteName(routeName: AllRouteKey) {
      const tab = findTabByRouteName(routeName, this.tabs);
      if (!tab) return;

      await this.removeTab(tab.id);
    },

    /**
     * @description 清除多页签
     * @description Clear tabs
     *
     * @param excludes Exclude tab ids - [排除的标签id]
     */
    async clearTabs(excludes: string[] = []) {
      const remainTabIds = [...getFixedTabIds(this.tabs), ...excludes];

      const removedTabsIds = this.tabs
        .map((tab) => tab.id)
        .filter((id) => !remainTabIds.includes(id));

      const isRemoveActiveTab = removedTabsIds.includes(this.activeTabId);
      const updatedTabs = filterTabsByIds(removedTabsIds, this.tabs);

      if (!isRemoveActiveTab) {
        this.tabs = updatedTabs;
        return;
      }

      const activeTab = updatedTabs[updatedTabs.length - 1] || this.homeTab;

      await this.switchRouteByTab(activeTab);
      this.tabs = updatedTabs;
    },
    /**
     * @description 根据tab切换路由
     * @description Switch route by tab
     *
     * @param tab Tab
     */
    async switchRouteByTab(tab: App.Tab) {
      const { goKey } = useGo(false);
      const fail = await goKey(tab.routeKey);
      if (fail) {
        this.setActiveTabId(tab.id);
      }
    },
    /**
     * @description 清除左侧标签
     * @description Clear left tabs
     *
     * @param tabId Tab id
     */
    async clearLeftTabs(tabId: string) {
      const tabIds = this.tabs.map((tab) => tab.id);
      const index = tabIds.indexOf(tabId);
      if (index === -1) return;

      const excludes = tabIds.slice(index);
      await this.clearTabs(excludes);
    },
    /**
     * @description 清除右侧标签
     * @description Clear right tabs
     *
     * @param tabId Tab id
     */
    async clearRightTabs(tabId: string) {
      const isHomeTab = tabId === this.homeTab?.id;
      if (isHomeTab) {
        await this.clearTabs();
        return;
      }

      const tabIds = this.tabs.map((tab) => tab.id);
      const index = tabIds.indexOf(tabId);
      if (index === -1) return;

      const excludes = tabIds.slice(0, index + 1);
      await this.clearTabs(excludes);
    },
    /**
     * @description 给tab设置新的label
     * @description Set new label of tab
     *
     * @default activeTabId
     * @param label New tab label
     * @param tabId Tab id
     */
    setTabLabel(label: string, tabId?: string) {
      const id = tabId || this.activeTabId;

      const tab = this.tabs.find((item) => item.id === id);
      if (!tab) return;

      tab.oldLabel = tab.label;
      tab.newLabel = label;
    },
    /**
     * @description 重置tab label
     * @description Reset tab label
     *
     * @default activeTabId
     * @param tabId Tab id
     */
    resetTabLabel(tabId?: string) {
      const id = tabId || this.activeTabId;

      const tab = this.tabs.find((item) => item.id === id);
      if (!tab) return;

      tab.newLabel = undefined;
    },
    /**
     * @description 是否是首页tab，也就是保留的tab
     * @description Is tab retain
     *
     * @param tabId
     */
    isTabRetain(tabId: string) {
      if (tabId === this.homeTab?.id) return true;

      const fixedTabIds = getFixedTabIds(this.tabs);

      return fixedTabIds.includes(tabId);
    },
    /**
     * @description 更新tabs locale
     * @description Update tabs by locale
     */
    updateTabsByLocale() {
      this.tabs = updateTabsByI18nKey(this.tabs);

      if (this.homeTab) {
        this.homeTab = updateTabByI18nKey(this.homeTab);
      }
    },
    /**
     * @description 缓存tabs
     * @description Cache tabs
     */
    setCacheTabs() {
      if (cacheTab) localStg.set(MULTIPLE_TABS_KEY, this.tabs);
    },
    /**
     * @description 设置tabs(拖拽排序使用)
     * @description Set tabs
     *
     * @param tabs
     */
    setTabs(tabs: App.Tab[]) {
      this.tabs = tabs;
    },
  },
});

// Need to be used outside the setup
export function useMultipleTabWithOutStore() {
  return useMultipleTabStore(store);
}
