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
});
