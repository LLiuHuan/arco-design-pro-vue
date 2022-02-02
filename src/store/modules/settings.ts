import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
import projectSetting from '@/settings/projectSetting';
import type { ImenuSetting } from '/#/config';

const { Theme } = designSetting;
const { permissionMode, menuSetting } = projectSetting;

export interface ISettingsState {
  theme: string; //主题
  loading: boolean; // TODO: 临时测试，无用
  permissionMode: string;
  menuSetting: ImenuSetting; //多标签
}

export const useSettingStore = defineStore({
  id: 'app-settings',
  state: (): ISettingsState => ({
    theme: Theme,
    loading: false,
    permissionMode: permissionMode,
    menuSetting: menuSetting,
  }),
  getters: {
    getTheme(): string {
      return this.theme;
    },
    getLoading(): boolean {
      return this.loading;
    },
  },
  actions: {
    setTheme(theme: string) {
      this.theme = theme;
    },
    setLoading(loading: boolean) {
      this.loading = loading;
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-settings',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
