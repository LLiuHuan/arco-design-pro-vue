import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { AppEnum, ThemeColorEnum } from '@/enums';
import type { ProjectConfig, ThemeSettingColors } from '~/types/config';
import { ThemeInfo } from '~/types/config';
import { usePreferredColorScheme } from '@vueuse/core';
import { setProTheme, setThemeColors } from '@/utils/common';

let timeId: TimeoutHandle;

export const useRootSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取系统主题 Dark/Light/Auto
   * @description Get system theme Dark/Light/Auto
   */
  const osTheme = usePreferredColorScheme();

  /**
   * @description: 获取页面加载状态
   * @description: Get page loading status
   */
  const getPageLoading = computed(() => appStore.pageLoading);

  /**
   * @description: 获取项目配置
   */
  const getRootSetting = computed(() => appStore.setting);

  /**
   * @description: 获取固定头部和选项卡
   * @description: Get fixed header and tab
   */
  const getFixedHeaderAndTab = computed(
    () => appStore.setting.fixedHeaderAndTab,
  );

  /**
   * @description: 获取内容区域是否可以x轴滚动
   * @description: Get whether the content area can scroll on the x-axis
   */
  const getContentXScrollable = computed(
    () => appStore.setting.contentXScrollable,
  );

  /**
   * @description: 获取是否开启页面缓存
   * @description: Get whether to enable page caching
   */
  const getOpenKeepAlive = computed(() => appStore.setting.openKeepAlive);

  /**
   * @description: 获取主题模式
   * @description: Get theme mode
   */
  const getDarkMode = computed(() => appStore.darkMode);

  /**
   * @description: 获取下一个获取下一个主题模式
   * @description: Get the next theme mode
   */
  const getNextDarkMode = computed(() => appStore.getNextDarkMode());

  /**
   * @description: 获取是否是暗黑模式
   * @description: Get whether it is dark mode
   */
  const getIsDarkMode = computed(() => {
    if (unref(getDarkMode) === AppEnum.AUTO) {
      return unref(osTheme) === AppEnum.DARK;
    }
    return unref(getDarkMode) === AppEnum.DARK;
  });

  /**
   * @description: 获取主题颜色
   * @description: Get theme color
   */
  const getThemeColor = computed(() => appStore.setting.themeSetting.colors);

  /**
   * @description: 获取设置抽屉状态
   * @description: Get the setting drawer status
   */
  const getSettingDrawerState = computed(() => appStore.settingDrawerState);

  /**
   * @description: 获取是否显示logo
   * @description: Get whether to display the logo
   */
  const getShowLogo = computed(() => appStore.setting.showLogo);

  /**
   * @description: 获取是否显示设置按钮
   * @description: Get whether to display the setting button
   */
  const getShowSettingButton = computed(
    () => appStore.setting.showSettingButton,
  );

  /**
   * @description: 获取设置按钮位置
   * @description: Get the position of the setting button
   */
  const getSettingButtonPosition = computed(
    () => appStore.setting.settingButtonPosition,
  );

  /**
   * @description: 获取是否是移动端
   * @description: Get whether it is a mobile terminal
   */
  const getIsMobile = computed(() => appStore.isMobile);

  /**
   * @description: 获取是否开启色弱模式
   * @description: Get whether to enable color weak mode
   */
  const getWeakMode = computed(() => appStore.setting.colorWeak);
  /**
   * @description: 获取是否开启灰色模式
   * @description: Get whether to enable gray mode
   */
  const getGrayMode = computed(() => appStore.setting.grayMode);

  /**
   * @description: 获取主题配置
   * @description: Get theme configuration
   */
  const getThemePro = computed(() => appStore.setting?.themeProSetting);

  /**
   * @description: 获取是否开启水印
   * @description: Get whether to enable watermark
   */
  const getShowWatermark = computed(() => appStore.setting.watermark);

  /**
   * @description: 获取水印文本
   * @description: Get watermark text
   */
  const getWatermarkText = computed(() => appStore.setting.watermarkText);

  /**
   * @description: 获取刷新标记
   * @description: Get refresh flag
   */
  const getReloadFlag = computed(() => appStore.reloadFlag);

  /**
   * @description: 设置项目配置
   * @description: Set project configuration
   *
   * @param setting
   */
  const setRootSetting = (setting: Partial<ProjectConfig>) => {
    appStore.setProjectConfig(setting);
  };

  /**
   * @description: 设置暗黑模式
   * @description: Set dark mode
   *
   * @param mode
   */
  const setDarkMode = (mode: AppEnum) => {
    appStore.setDarkMode(mode);
  };

  /**
   * @description: 设置主题颜色
   * @description: Set theme color
   *
   * @param key ThemeColorEnum 主题颜色键
   * @param value string 颜色值
   */
  const setThemeColor = (key: ThemeColorEnum, value: string) => {
    appStore.setProjectConfig({
      themeSetting: {
        colors: {
          [key]: value,
        },
      },
    });

    setThemeColors(appStore.getThemeColors());
  };

  /**
   * @description 修改全部主题颜色
   * @param colors
   */
  const setThemeAllColor = (colors: ThemeSettingColors) => {
    appStore.setProjectConfig({
      themeSetting: {
        colors,
      },
    });
    setThemeColors(appStore.getThemeColors());
  };

  /**
   * @description: 设置主题配置
   * @description: Set theme configuration
   *
   * @param theme
   */
  const setThemePro = async (theme?: ThemeInfo | null) => {
    // 设置主题信息
    appStore.setProjectConfig({
      themeProSetting: theme,
    });

    await setProTheme(theme?.packageName || '');
  };

  /**
   * @description: 切换暗黑模式
   * @description: Toggle dark mode
   */
  const toggleDarkMode = () => {
    appStore.toggleDarkMode();
  };

  /**
   * @description: 设置设置抽屉状态
   * @description: Set the setting drawer status
   *
   * @param state
   */
  const setSettingDrawerState = (state: boolean) => {
    appStore.setSettingDrawerState(state);
  };

  /**
   * @description: 设置页面加载状态
   * @description: Set page loading status
   *
   * @param loading
   */
  const setPageLoading = (loading: boolean): void => {
    appStore.setPageLoading(loading);
  };

  /**
   * @description: 设置页面加载状态
   * @description: Set page loading status
   *
   * @param loading
   */
  const setPageLoadingAction = async (loading: boolean): Promise<void> => {
    if (loading) {
      clearTimeout(timeId);
      // Prevent flicker
      timeId = setTimeout(() => {
        setPageLoading(loading);
      }, 50);
    } else {
      setPageLoading(loading);
      clearTimeout(timeId);
    }
  };

  /**
   * @description: 刷新页面
   * @description: Reload page
   *
   * @param duration
   */
  const refreshPage = async (duration = 300) => {
    await appStore.refreshPage(duration);
  };

  /**
   * @description 设置内容页面是否可以滚动
   * @description Set whether the content page can scroll
   *
   * @param flag
   */
  const setContentXScrollable = (flag: boolean) => {
    appStore.setProjectConfig({
      contentXScrollable: flag,
    });
  };

  return {
    getDarkMode,
    getIsDarkMode,
    getRootSetting,
    getNextDarkMode,
    getOpenKeepAlive,
    getSettingDrawerState,
    getThemeColor,
    getShowLogo,
    getPageLoading,
    getShowSettingButton,
    getSettingButtonPosition,
    getFixedHeaderAndTab,
    getContentXScrollable,
    getIsMobile,
    getWeakMode,
    getGrayMode,
    getThemePro,
    getShowWatermark,
    getWatermarkText,
    getReloadFlag,

    setRootSetting,
    setDarkMode,
    toggleDarkMode,
    setSettingDrawerState,
    setThemeColor,
    setThemeAllColor,
    setThemePro,
    setPageLoading,
    setPageLoadingAction,
    refreshPage,
    setContentXScrollable,
  };
};
