import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { ThemeEnum } from '@/enums';
import type { ProjectConfig } from '~/types/config';

type RootSetting = Omit<
  ProjectConfig,
  'locale' | 'headerSetting' | 'menuSetting' | 'multiTabsSetting'
>;

export const useRootSetting = () => {
  const appStore = useAppStore();

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

  function setRootSetting(setting: Partial<RootSetting>) {
    appStore.setProjectConfig(setting);
  }

  function setDarkMode(mode: ThemeEnum) {
    appStore.setDarkMode(mode);
  }

  function toggleDarkMode() {
    appStore.toggleDarkMode();
  }

  return {
    getDarkMode,
    getIsDarkMode,
    getNextDarkMode,
    getOpenKeepAlive,
    getCanEmbedIFramePage,

    setRootSetting,
    setDarkMode,
    toggleDarkMode,
  };
};
