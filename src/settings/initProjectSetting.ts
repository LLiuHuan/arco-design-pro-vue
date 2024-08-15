import { useAppStore } from '@/store/modules/app';

/**
 * @description Initialize project settings - [初始化项目设置]
 */
export const initProjectSetting = () => {
  const appStore = useAppStore();

  const { darkMode } = appStore;

  appStore.setDarkMode(darkMode);
};
