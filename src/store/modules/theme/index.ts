import { defineStore } from 'pinia';
import type { Theme } from '~/types/theme';

type ThemeState = Theme.Setting;

export const useThemeStore = defineStore('theme-store', {
  state: (): ThemeState => ({
    darkMode: 'dark',
  }),
  getters: {
    /** 是否暗黑模式 */
    isDarkMode(state) {
      return state.darkMode === 'dark';
    },
  },
  actions: {
    /** 设置暗黑模式 */
    setDarkMode(darkMode: 'dark' | 'light') {
      this.darkMode = darkMode;
    },
    /** 切换暗黑模式 */
    toggleDarkMode() {
      this.darkMode = this.darkMode === 'dark' ? 'light' : 'dark';
    },
  },
});
