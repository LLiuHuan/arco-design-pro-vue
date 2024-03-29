import { store } from '@/store';
import { defineStore } from 'pinia';
import {
  APP_DARK_MODE_IS_AUTO_KEY,
  APP_DARK_MODE_KEY,
  PROJ_CFG_KEY,
  ThemeEnum,
} from '@/enums';
import type {
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  TransitionSetting,
} from '~/types/config';
import type { BeforeMiniState } from '~/types/storage';
import { deepMerge, localStg } from '@/utils';
import { darkMode } from '@/settings';
import { initAppSetting } from './helpers';

interface AppState {
  /**
   * @description Theme enum - [主题枚举]
   */
  darkMode?: ThemeEnum;
  /**
   * @description Page loading status - [页面加载状态]
   */
  pageLoading: boolean;
  /**
   * @description project config - [项目配置信息]
   */
  projectConfig: ProjectConfig | null;
  /**
   * @description When the window shrinks, remember some states, and restore these states when the window is restored
   * @description [当窗口缩小时，记住一些状态，当窗口恢复时恢复这些状态]
   */
  beforeMiniInfo: BeforeMiniState;
}

export const useAppStore = defineStore({
  id: 'store-app',
  state: (): AppState => ({
    pageLoading: false,
    projectConfig: initAppSetting(),
    beforeMiniInfo: {},
  }),
  getters: {
    // 获取页面加载状态
    getPageLoading(state): boolean {
      return state.pageLoading;
    },
    // 获取主题
    getDarkMode(state): ThemeEnum {
      return (
        state.darkMode ||
        (localStorage.getItem(APP_DARK_MODE_KEY) as ThemeEnum) ||
        darkMode
      );
    },
    // 获取下一个主题
    getNextDarkMode(): ThemeEnum {
      const themeSchemes: ThemeEnum[] = [ThemeEnum.LIGHT, ThemeEnum.DARK];

      if (localStg.get(APP_DARK_MODE_IS_AUTO_KEY))
        themeSchemes.push(ThemeEnum.AUTO);
      const index = themeSchemes.findIndex((item) => item === this.getDarkMode);
      const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
      return themeSchemes[nextIndex];
    },
    // 获取窗口状态
    getBeforeMiniInfo(state): BeforeMiniState {
      return state.beforeMiniInfo;
    },
    // 获取项目信息
    getProjectConfig(state): ProjectConfig {
      return state.projectConfig || ({} as ProjectConfig);
    },
    getMenuSetting(): MenuSetting {
      return this.getProjectConfig.menuSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.getProjectConfig.transitionSetting;
    },
    getMultiTabsSetting(): MultiTabsSetting {
      return this.getProjectConfig.multiTabsSetting;
    },
  },
  actions: {
    // 设置页面加载状态
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },

    /**
     * @description Set the theme - [设置主题]
     * @param mode
     */
    setDarkMode(mode: ThemeEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY, mode);
    },
    /**
     * @description Toggle the theme - [切换主题]
     */
    toggleDarkMode(): void {
      this.setDarkMode(this.getNextDarkMode);
    },
    // 设置窗口信息
    setBeforeMiniInfo(state: BeforeMiniState): void {
      this.beforeMiniInfo = state;
    },

    // 设置项目配置
    setProjectConfig(config: DeepPartial<ProjectConfig>): void {
      this.projectConfig = deepMerge(
        this.projectConfig || {},
        config,
      ) as ProjectConfig;
      localStg.set(PROJ_CFG_KEY, this.projectConfig);
    },
    setMenuSetting(setting: Partial<MenuSetting>): void {
      this.projectConfig!.menuSetting = deepMerge(
        this.projectConfig!.menuSetting,
        setting,
      );
      localStg.set(PROJ_CFG_KEY, this.projectConfig);
    },

    // async resetAllState() {
    //   resetRouter();
    //   Persistent.clearAll();
    // },
    // async setPageLoadingAction(loading: boolean): Promise<void> {
    //   if (loading) {
    //     clearTimeout(timeId);
    //     // Prevent flicker
    //     timeId = setTimeout(() => {
    //       this.setPageLoading(loading);
    //     }, 50);
    //   } else {
    //     this.setPageLoading(loading);
    //     clearTimeout(timeId);
    //   }
    // },
    // setApiAddress(config: ApiAddress): void {
    //   localStorage.setItem(API_ADDRESS, JSON.stringify(config));
    // },
  },
});

// Need to be used outside the setup - [需要在设置外部使用]
export function useAppStoreWithOut() {
  return useAppStore(store);
}
