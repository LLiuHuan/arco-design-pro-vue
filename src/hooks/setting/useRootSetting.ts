import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { ThemeColorEnum, ThemeEnum } from '@/enums';
import type { ProjectConfig } from '~/types/config';
import { setBaseColor } from '@/utils/common';

export const useRootSetting = () => {
  const appStore = useAppStore();

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
  const getIsDarkMode = computed(() => appStore.getDarkMode === ThemeEnum.DARK);

  const getThemeColor = computed(() => appStore.getProjectConfig.themeSetting);

  const getSettingDrawerState = computed(() => appStore.getSettingDrawerState);

  const setRootSetting = (setting: Partial<ProjectConfig>) => {
    appStore.setProjectConfig(setting);
  };

  const setDarkMode = (mode: ThemeEnum) => {
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

    setRootSetting,
    setDarkMode,
    toggleDarkMode,
    setSettingDrawerState,
    setThemeColor,
  };
};
