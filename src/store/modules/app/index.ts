import { store } from '@/store';
import { defineStore } from 'pinia';
import {
  APP_DARK_MODE_IS_AUTO_KEY,
  APP_DARK_MODE_KEY,
  PROJ_CFG_KEY,
  AppEnum,
} from '@/enums';
import type {
  HeaderSetting,
  MenuSetting,
  MultiTabsSetting,
  ProjectConfig,
  ThemeSetting,
  TransitionSetting,
} from '~/types/config';
import type { BeforeMiniState } from '~/types/storage';
import { darkMode } from '@/settings';
import { localStg } from '@/utils/cache';
import { deepMerge } from '@/utils/common';
import { initAppSetting } from './helpers';

interface AppState {
  /**
   * @description Theme enum - [主题枚举]
   */
  darkMode?: AppEnum;
  /**
   * @description Setting Drawer Status - [设置抽屉状态]
   */
  settingDrawerState?: boolean;
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

let timeId: TimeoutHandle;

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
    getDarkMode(state): AppEnum {
      return (
        state.darkMode ||
        (localStorage.getItem(APP_DARK_MODE_KEY) as AppEnum) ||
        darkMode
      );
    },
    // 获取下一个主题
    getNextDarkMode(): AppEnum {
      const themeSchemes: AppEnum[] = [AppEnum.LIGHT, AppEnum.DARK];
      if (localStg.get(APP_DARK_MODE_IS_AUTO_KEY))
        themeSchemes.push(AppEnum.AUTO);
      const index = themeSchemes.findIndex((item) => item === this.getDarkMode);
      const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
      return themeSchemes[nextIndex];
    },
    /**
     * @description Get the setting drawer status - [获取设置抽屉状态]
     * @param state
     */
    getSettingDrawerState(state): boolean {
      return state.settingDrawerState || false;
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
    getThemeSetting(): ThemeSetting {
      return this.getProjectConfig.themeSetting;
    },
    getHeaderSetting(): HeaderSetting {
      return this.getProjectConfig.headerSetting;
    },
  },
  actions: {
    /**
     * @description Set the page loading status - [设置页面加载状态]
     * @param loading loading - [加载状态]
     */
    setPageLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    /**
     * @description Set the theme - [设置主题]
     * @param mode mode - [主题]
     */
    setDarkMode(mode: AppEnum): void {
      this.darkMode = mode;
      localStorage.setItem(APP_DARK_MODE_KEY, mode);
    },
    /**
     * @description Toggle the theme - [切换主题]
     */
    toggleDarkMode(): void {
      this.setDarkMode(this.getNextDarkMode);
    },
    /**
     * @description Set the setting drawer status - [设置设置抽屉状态]
     * @param state
     */
    setSettingDrawerState(state: boolean): void {
      this.settingDrawerState = state;
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
    //   localStg.clear();
    //   sessionStg.clear();
    // },
    async setPageLoadingAction(loading: boolean): Promise<void> {
      if (loading) {
        clearTimeout(timeId);
        // Prevent flicker
        timeId = setTimeout(() => {
          this.setPageLoading(loading);
        }, 50);
      } else {
        this.setPageLoading(loading);
        clearTimeout(timeId);
      }
    },
    // setApiAddress(config: ApiAddress): void {
    //   localStorage.setItem(API_ADDRESS, JSON.stringify(config));
    // },
  },
  // persist: {
  //   key: PINIA_CACHE.PINIA_APP_STORE,
  //   storage: localStorage,
  //   debug: true,
  // },
});

// Need to be used outside the setup - [需要在设置外部使用]
export function useAppStoreWithOut() {
  return useAppStore(store);
}
