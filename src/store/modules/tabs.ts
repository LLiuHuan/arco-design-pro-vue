import { defineStore } from 'pinia';
import { RouteItem } from '/#/config';
import { storage } from '@/utils/storage';
import { TABS_ROUTES } from '@/store/mutation-types';
import { RouteLocationNormalizedLoaded } from 'vue-router';
import { UnwrapRef } from 'vue';

const whiteList = ['Redirect', 'login'];

export interface ITabsState {
  tabsList: RouteItem[]; // 标签页
}

export const useTabsStore = defineStore({
  id: 'app-tabs',
  state: (): ITabsState => ({
    tabsList: [],
  }),
  getters: {
    getTabsList(): RouteItem[] {
      return this.tabsList;
    },
  },
  actions: {
    setInitTabs(tabList: RouteItem[]) {
      this.tabsList = tabList;
    },
    setAddTabs(routeItem: RouteItem): boolean {
      if (whiteList.includes(routeItem.name)) return false;
      const isExists = this.tabsList.some((item) => item.fullPath == routeItem.fullPath);
      if (!isExists) {
        this.tabsList.push(routeItem);
      }
      return true;
    },
    setCloseLeftTabs(
      routeItem:
        | RouteItem
        | RouteLocationNormalizedLoaded
        | UnwrapRef<RouteLocationNormalizedLoaded>
    ) {
      // 关闭左侧
      const index = this.tabsList.findIndex((item) => item.fullPath == routeItem.fullPath);
      this.tabsList.splice(0, index);
    },
    setCloseRightTabs(
      routeItem:
        | RouteItem
        | RouteLocationNormalizedLoaded
        | UnwrapRef<RouteLocationNormalizedLoaded>
    ) {
      // 关闭右侧
      const index = this.tabsList.findIndex((item) => item.fullPath == routeItem.fullPath);
      this.tabsList.splice(index + 1);
    },
    setCloseOtherTabs(
      routeItem:
        | RouteItem
        | RouteLocationNormalizedLoaded
        | UnwrapRef<RouteLocationNormalizedLoaded>
    ) {
      // 关闭其他
      this.tabsList = this.tabsList.filter((item) => item.fullPath == routeItem.fullPath);
    },
    setCloseCurrentTabs(
      routeItem:
        | RouteItem
        | RouteLocationNormalizedLoaded
        | UnwrapRef<RouteLocationNormalizedLoaded>
    ) {
      // 关闭当前页
      const index = this.tabsList.findIndex((item) => item.fullPath == routeItem.fullPath);
      this.tabsList.splice(index, 1);
    },
    setCloseAllTabs() {
      // 关闭全部
      this.tabsList = [];
      storage.remove(TABS_ROUTES);
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-tabs',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
