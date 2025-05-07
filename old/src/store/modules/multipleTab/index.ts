import { appSetting } from '@/settings';
import { defineStore } from 'pinia';
import { MULTIPLE_TABS_KEY, StoreEnum } from '@/enums';
import { localStg } from '@/utils/cache';
import { useGo } from '@/hooks/web/usePage';
import { router } from '@/router';
import { computed, ref } from 'vue';
import type { RouteKey } from '@elegant-router/types';
import { useEventListener } from '@vueuse/core';
import {
  extractTabsByAllRoutes,
  filterTabsByIds,
  findTabByRouteName,
  getAllTabs,
  getDefaultHomeTab,
  getFixedTabIds,
  getTabByRoute,
  getTabIdByRoute,
  isTabInTabs,
  updateTabByI18nKey,
  updateTabsByI18nKey,
} from './helpers';

export const useMultipleTabStore = defineStore(StoreEnum.MultipleTab, () => {
  const cacheTab = appSetting.multiTabsSetting.cache;

  const tabs = ref<App.Tab[]>([]);
  const activeTabId = ref('');
  const homeTab = ref<App.Tab>();
  const { goKey } = useGo(false);

  const allTabs = computed(() => getAllTabs(tabs.value, homeTab.value));
  const activeTab = computed(() =>
    tabs.value.find((tab) => tab.id === activeTabId.value),
  );

  /**
   * @description 设置激活的标签
   * @description Set the active tab
   * @param id
   */
  function setActiveTabId(id: string) {
    activeTabId.value = id;
  }

  /**
   * @description 添加多页签
   * @description Add tab
   *
   * @param route Tab route - [标签路由]
   * @param active Whether to activate the added tab - [是否激活添加的标签]
   */
  function addTab(route: App.TabRoute, active = true) {
    const tab = getTabByRoute(route);

    const isHomeTab = tab.id === homeTab.value?.id;

    if (!isHomeTab && !isTabInTabs(tab.id, tabs.value)) {
      tabs.value.push(tab);
    }

    if (active) {
      setActiveTabId(tab.id);
    }
  }

  /**
   * @description 根据tab切换路由
   * @description Switch route by tab
   *
   * @param tab Tab
   */
  async function switchRouteByTab(tab: App.Tab) {
    const fail = await goKey(tab.routeKey);
    if (fail) {
      setActiveTabId(tab.id);
    }
  }

  /**
   * @description 删除多页签
   * @description Remove tab
   *
   * @param tabId Tab id - [标签id]
   */
  async function removeTab(tabId: string) {
    const isRemoveActiveTab = activeTabId.value === tabId;
    const updatedTabs = tabs.value.filter((tab) => tab.id !== tabId);

    function update() {
      tabs.value = updatedTabs;
    }

    if (!isRemoveActiveTab) {
      update();
      return;
    }

    const active = updatedTabs.at(-1) || homeTab.value;

    if (active) {
      await switchRouteByTab(active);
      update();
    }
  }

  /**
   * @description 删除激活的tab
   * @description remove active tab
   */
  async function removeActiveTab() {
    await removeTab(activeTabId.value);
  }

  /**
   * @description 通过路由名称删除tab
   * @description remove tab by route name
   *
   * @param routeName route name
   */
  async function removeTabByRouteName(routeName: RouteKey) {
    const tab = findTabByRouteName(routeName, tabs.value);
    if (!tab) return;

    await removeTab(tab.id);
  }

  /**
   * @description 清除多页签
   * @description Clear tabs
   *
   * @param excludes Exclude tab ids - [排除的标签id]
   */
  async function clearTabs(excludes: string[] = []) {
    const remainTabIds = [...getFixedTabIds(tabs.value), ...excludes];

    const removedTabsIds = tabs.value
      .map((tab) => tab.id)
      .filter((id) => !remainTabIds.includes(id));

    const isRemoveActiveTab = removedTabsIds.includes(activeTabId.value);
    const updatedTabs = filterTabsByIds(removedTabsIds, tabs.value);

    function update() {
      tabs.value = updatedTabs;
    }

    if (!isRemoveActiveTab) {
      update();
      return;
    }

    const active = updatedTabs[updatedTabs.length - 1] || homeTab.value;

    await switchRouteByTab(active);
    tabs.value = updatedTabs;
  }

  /**
   * @description 清除左侧标签
   * @description Clear left tabs
   *
   * @param tabId Tab id
   */
  async function clearLeftTabs(tabId: string) {
    const tabIds = tabs.value.map((tab) => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(index);
    await clearTabs(excludes);
  }

  /**
   * @description 清除右侧标签
   * @description Clear right tabs
   *
   * @param tabId Tab id
   */
  async function clearRightTabs(tabId: string) {
    const isHomeTab = tabId === homeTab.value?.id;
    if (isHomeTab) {
      await clearTabs();
      return;
    }

    const tabIds = tabs.value.map((tab) => tab.id);
    const index = tabIds.indexOf(tabId);
    if (index === -1) return;

    const excludes = tabIds.slice(0, index + 1);
    await clearTabs(excludes);
  }

  /**
   * @description 给tab设置新的label
   * @description Set new label of tab
   *
   * @default activeTabId
   * @param label New tab label
   * @param tabId Tab id
   */
  function setTabLabel(label: string, tabId?: string) {
    const id = tabId || activeTabId.value;

    const tab = tabs.value.find((item) => item.id === id);
    if (!tab) return;

    tab.oldLabel = tab.label;
    tab.newLabel = label;
  }

  /**
   * @description 重置tab label
   * @description Reset tab label
   *
   * @default activeTabId
   * @param tabId Tab id
   */
  function resetTabLabel(tabId?: string) {
    const id = tabId || activeTabId.value;

    const tab = tabs.value.find((item) => item.id === id);
    if (!tab) return;

    tab.newLabel = undefined;
  }

  /**
   * @description 是否是首页tab，也就是保留的tab
   * @description Is tab retain
   *
   * @param tabId
   */
  function isTabRetain(tabId: string) {
    if (tabId === homeTab.value?.id) return true;

    const fixedTabIds = getFixedTabIds(tabs.value);

    return fixedTabIds.includes(tabId);
  }

  /**
   * @description 更新tabs locale
   * @description Update tabs by locale
   */
  function updateTabsByLocale() {
    tabs.value = updateTabsByI18nKey(tabs.value);

    if (homeTab.value) {
      homeTab.value = updateTabByI18nKey(homeTab.value);
    }
  }

  /**
   * @description 缓存tabs
   * @description Cache tabs
   */
  function setCacheTabs() {
    if (!cacheTab) return;

    localStg.set(MULTIPLE_TABS_KEY, tabs.value);
  }

  /**
   * @description 设置tabs(拖拽排序使用)
   * @description Set tabs
   *
   * @param tabList
   */
  function setTabs(tabList: App.Tab[]) {
    tabs.value = tabList;
  }

  /**
   * @description 初始化主页标签
   * @description Initialize the home tab
   */
  function initHomeTab() {
    homeTab.value = getDefaultHomeTab(router, 'dashboard_analysis');
  }

  /**
   * @description 初始化多页签
   * @description Init tab store
   *
   * @param currentRoute Current route
   */
  function initTabs(currentRoute: App.TabRoute) {
    const storageTabs = localStg.get(MULTIPLE_TABS_KEY);

    if (cacheTab && storageTabs) {
      const extractedTabs = extractTabsByAllRoutes(router, storageTabs);
      tabs.value = updateTabsByI18nKey(extractedTabs);
    }

    addTab(currentRoute);
  }

  // 当页面关闭或刷新时缓存标签
  // cache tabs when page is closed or refreshed
  useEventListener(window, 'beforeunload', () => {
    setCacheTabs();
  });

  return {
    tabs: allTabs,
    activeTab,
    activeTabId,

    initHomeTab,
    initTabs,
    addTab,
    removeTab,
    removeActiveTab,
    removeTabByRouteName,
    clearTabs,
    clearLeftTabs,
    clearRightTabs,
    switchRouteByTab,
    setTabLabel,
    resetTabLabel,
    isTabRetain,
    updateTabsByLocale,
    getTabIdByRoute,
    setCacheTabs,
    setTabs,
  };
});
