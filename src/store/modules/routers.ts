import { defineStore } from 'pinia';
import { constantRouter } from '@/router';

export interface IRoutersState {
  asyncRouters: any[];
}

export const useRoutersStore = defineStore({
  id: 'app-routers',
  state: (): IRoutersState => ({
    asyncRouters: constantRouter,
  }),
  getters: {
    getRouters(): any[] {
      return this.asyncRouters;
    },
  },
  actions: {
    setRouters(routers) {
      this.asyncRouters = routers;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-routers',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
