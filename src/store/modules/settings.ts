import { defineStore } from 'pinia';
import designSetting from '@/settings/designSetting';
import projectSetting from '@/settings/projectSetting';

const { Theme } = designSetting;
const { permissionMode } = projectSetting;

export interface ISettingsState {
  //主题
  theme: string;
  loading: boolean; // TODO: 临时测试，无用
  permissionMode: string;
}

export const useSettingsStore = defineStore({
  id: 'app-settings',
  state: (): ISettingsState => ({
    theme: Theme,
    loading: false,
    permissionMode: permissionMode,
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
