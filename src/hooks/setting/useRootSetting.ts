import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { ThemeColorEnum, AppEnum } from '@/enums';
import type { ProjectConfig } from '~/types/config';
import { setBaseColor } from '@/utils/common';
import { usePreferredColorScheme } from '@vueuse/core';

export const useRootSetting = () => {
  const appStore = useAppStore();

  const osTheme = usePreferredColorScheme();

  const getPageLoading = computed(() => appStore.getPageLoading);

  /**
   * @description: 获取项目配置
   */
  const getRootSetting = computed(() => appStore.getProjectConfig);

  // 获取页面是否开启keep-alive
  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive,
  );

  // 获取是否可以嵌入iframe页面
  const getCanEmbedIFramePage = computed(
    () => appStore.getProjectConfig.canEmbedIFramePage,
  );

  // 获取主题模式
  const getDarkMode = computed(() => appStore.getDarkMode);

  // 获取下一个主题模式
  const getNextDarkMode = computed(() => appStore.getNextDarkMode);

  // 获取是否开启暗黑模式
  const getIsDarkMode = computed(() => {
    if (unref(getDarkMode) === AppEnum.AUTO) {
      return unref(osTheme) === AppEnum.DARK;
    }
    return unref(getDarkMode) === AppEnum.DARK;
  });

  // 获取主题颜色
  const getThemeColor = computed(() => appStore.getProjectConfig.themeSetting);

  // 获取是否开启设置抽屉
  const getSettingDrawerState = computed(() => appStore.getSettingDrawerState);

  // 获取是否显示logo
  const getShowLogo = computed(() => appStore.getProjectConfig.showLogo);

  const setRootSetting = (setting: Partial<ProjectConfig>) => {
    appStore.setProjectConfig(setting);
  };

  const setDarkMode = (mode: AppEnum) => {
    appStore.setDarkMode(mode);
  };

  const setThemeColor = (key: ThemeColorEnum, value: string) => {
    appStore.setProjectConfig({
      themeSetting: {
        [key]: value,
      },
    });

    setBaseColor(value, key, unref(getIsDarkMode));
  };

  const toggleDarkMode = () => {
    appStore.toggleDarkMode();
  };

  const setSettingDrawerState = (state: boolean) => {
    appStore.setSettingDrawerState(state);
  };

  return {
    getDarkMode,
    getIsDarkMode,
    getRootSetting,
    getNextDarkMode,
    getOpenKeepAlive,
    getCanEmbedIFramePage,
    getSettingDrawerState,
    getThemeColor,
    getShowLogo,
    getPageLoading,

    setRootSetting,
    setDarkMode,
    toggleDarkMode,
    setSettingDrawerState,
    setThemeColor,
  };
};
