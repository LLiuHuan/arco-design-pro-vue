import { defineStore } from 'pinia';
import {
  APP_DARK_MODE_KEY,
  AppEnum,
  MenuModeEnum,
  PROJ_CFG_KEY,
  StoreEnum,
  ThemeColorEnum,
} from '@/enums';
import {
  MenuSetting,
  ProjectConfig,
  ThemeInfo,
  type ThemeSettingColors,
} from '~/types/config';
import type { BeforeMiniState } from '~/types/storage';
import {
  breakpointsTailwind,
  useBreakpoints,
  usePreferredColorScheme,
} from '@vueuse/core';
import { computed, effectScope, onScopeDispose, ref, unref, watch } from 'vue';
import { useBoolean } from '@adp/hooks';
import {
  deepMerge,
  setProTheme,
  setThemeColors,
  toggleClass,
} from '@/utils/common';
import { localStg } from '@/utils/cache';
import { initAppSetting } from '@/store/modules/app/helpers';
import { useRouter } from 'vue-router';

export const useAppStore = defineStore(StoreEnum.App, () => {
  const breakpoints = useBreakpoints(breakpointsTailwind);
  const router = useRouter();
  const scope = effectScope();

  const { bool: pageLoading, setBool: setPageLoading } = useBoolean();
  const { bool: reloadFlag, setBool: setReloadFlag } = useBoolean(true);
  const { bool: settingDrawerState, setBool: setSettingDrawerState } =
    useBoolean();
  const {
    bool: siderCollapse,
    setBool: setSiderCollapse,
    toggle: toggleSiderCollapse,
  } = useBoolean();
  /**
   * @description 获取系统主题 Dark/Light/Auto
   * @description Get system theme Dark/Light/Auto
   */
  const osTheme = usePreferredColorScheme();

  /**
   * @description 项目配置信息
   * @description project config
   */
  const projectConfig = ref<ProjectConfig>(initAppSetting());

  const isMobile = breakpoints.smaller('sm');

  // region 主题相关
  const darkMode = ref(localStg.get(APP_DARK_MODE_KEY) || AppEnum.LIGHT);

  /**
   * @description 获取下一个主题
   * @description Get the next theme
   */
  function getNextDarkMode(isNotAuto?: boolean) {
    const themeSchemes: AppEnum[] = [AppEnum.LIGHT, AppEnum.DARK];
    if (!isNotAuto) {
      themeSchemes.push(AppEnum.AUTO);
    }
    const index = themeSchemes.findIndex((item) => item === darkMode.value);
    const nextIndex = index === themeSchemes.length - 1 ? 0 : index + 1;
    return themeSchemes[nextIndex];
  }

  /**
   * @description 设置主题
   * @description Set the theme
   *
   * @param mode 主题
   */
  function setDarkMode(mode: AppEnum) {
    darkMode.value = mode;
    localStg.set(APP_DARK_MODE_KEY, mode);
  }

  /**
   * @description 切换主题
   * @description Toggle theme
   */
  function toggleDarkMode(isNotAuto?: boolean) {
    setDarkMode(getNextDarkMode(isNotAuto));
  }

  /**
   * @description 获取主题颜色
   * @description Get theme color
   */
  function getThemeColors(): ThemeSettingColors {
    return (
      projectConfig.value.themeSetting.colors ?? {
        // 信息色
        // Primary color
        [ThemeColorEnum.PRIMARY]: '#165DFF',
        // 成功色
        // Success color
        [ThemeColorEnum.SUCCESS]: '#00B42A',
        // 警告色
        // Warning color
        [ThemeColorEnum.WARNING]: '#FF7D00',
        // 错误色
        // Error color
        [ThemeColorEnum.ERROR]: '#F53F3F',
      }
    );
  }

  const getThemePro = computed(() => projectConfig.value.themeProSetting);

  /**
   * @description: 设置主题配置
   * @description: Set theme configuration
   *
   * @param theme
   */
  async function setThemePro(theme?: ThemeInfo | null) {
    projectConfig.value.themeProSetting = theme;
    // 如果没有主题，移除主题
    if (!theme) {
      const proTheme = document.getElementById('pro-custom-theme');
      if (proTheme) {
        proTheme.setAttribute('href', '');
      }
    } else {
      await setProTheme(theme?.packageName || '');
    }
  }

  /**
   * @description 修改全部主题颜色
   * @param colors
   */
  function setThemeAllColor(colors: ThemeSettingColors) {
    projectConfig.value.themeSetting.colors = colors;
    setThemeColors(getThemeColors());
  }

  /**
   * @description: 获取是否是暗黑模式
   * @description: Get whether it is dark mode
   */
  const isDarkMode = computed(() => {
    if (unref(darkMode) === AppEnum.AUTO) {
      return unref(osTheme) === AppEnum.DARK;
    }
    return unref(darkMode) === AppEnum.DARK;
  });

  // endregion

  // region 窗口相关
  /**
   * @description 当窗口缩小时，记住一些状态，当窗口恢复时恢复这些状态
   * @description When the window shrinks, remember some states, and restore these states when the window is restored
   */
  const beforeMiniInfo = ref<BeforeMiniState>({});

  /**
   * @description 设置窗口信息
   * @description Set window information
   *
   * @param state
   */
  function setBeforeMiniInfo(state: BeforeMiniState) {
    beforeMiniInfo.value = state;
  }

  // endregion

  // region 项目设置相关
  /**
   * @description 设置项目配置
   * @description Set project configuration
   *
   * @param config
   */
  function setProjectConfig(config: DeepPartial<ProjectConfig>) {
    projectConfig.value = deepMerge(projectConfig.value, config);
    localStg.set(PROJ_CFG_KEY, projectConfig.value);
  }

  /**
   * @description 设置菜单配置
   * @description Set menu configuration
   *
   * @param setting
   */
  function setMenuSetting(setting: Partial<MenuSetting>) {
    projectConfig.value.menuSetting = deepMerge(
      projectConfig.value.menuSetting,
      setting,
    );
    localStg.set(PROJ_CFG_KEY, projectConfig.value);
  }

  // endregion

  // region 设置相关
  const grayMode = computed(() => projectConfig.value.grayMode);
  const colorWeak = computed(() => projectConfig.value.colorWeak);

  // endregion

  /**
   * @description: 刷新页面
   * @description: Reload page
   *
   * @param duration
   */
  async function refreshPage(duration = 300) {
    setReloadFlag(false);

    const d = projectConfig.value?.transitionSetting.enable ? duration : 40;

    await new Promise((resolve) => {
      setTimeout(resolve, d);
    });

    setReloadFlag(true);
  }

  /**
   * @description 是否全屏显示内容，不显示菜单
   * @description Whether to display the content in full screen without displaying the menu
   */
  const getFullContent = computed(() => {
    // Query parameters, the full screen is displayed when the address bar has a full paramete
    const { query } = router.currentRoute.value;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    // Return to the configuration in the configuration file
    return projectConfig.value.fullContent;
  });

  /**
   * @description 设置是否全屏显示内容
   * @description Set whether to display the content in full screen
   *
   * @param fullContent 是否全屏显示内容
   */
  const setFullContent = (fullContent: boolean) => {
    projectConfig.value.fullContent = fullContent;
  };

  const setDark = () => {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', AppEnum.DARK);
    document.documentElement.classList.add(AppEnum.DARK);
  };

  const setLight = () => {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
    document.documentElement.classList.remove(AppEnum.DARK, AppEnum.LIGHT);
  };

  const init = () => {
    // 如果初始化有主题，就设置主题
    if (projectConfig.value.themeProSetting) {
      setProTheme(projectConfig.value.themeProSetting.packageName).then(() => {
        setThemeColors(getThemeColors());
      });
    }

    // if (darkMode.value === AppEnum.DARK) {
    //   setDark();
    // } else if (darkMode.value === AppEnum.AUTO) {
    //   if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    //     setDark();
    //   } else {
    //     setLight();
    //   }
    // } else {
    //   setLight();
    // }
  };

  scope.run(() => {
    // 监听灰色模式
    watch(
      grayMode,
      (value) => {
        toggleClass(value, 'gray-mode', document.documentElement);
      },
      { immediate: true },
    );

    // 监听弱色模式
    watch(colorWeak, (value) => {
      toggleClass(value, 'color-weak', document.documentElement);
    });

    watch(
      () => isMobile.value,
      (newValue) => {
        if (newValue) {
          setBeforeMiniInfo({
            layoutMode: projectConfig.value.layoutSetting.mode,
            siderCollapsed: projectConfig.value.menuSetting.collapsed,
          });

          setProjectConfig({
            layoutSetting: {
              mode: MenuModeEnum.VERTICAL,
            },
            menuSetting: {
              collapsed: true,
            },
          });

          document.body.classList.add('mobile');
        } else {
          if (beforeMiniInfo.value) {
            setProjectConfig({
              layoutSetting: {
                mode: beforeMiniInfo.value.layoutMode,
              },
              menuSetting: {
                collapsed: beforeMiniInfo.value.siderCollapsed,
              },
            });

            setBeforeMiniInfo({});
          }
          document.body.classList.remove('mobile');
        }
      },
      { immediate: true },
    );

    watch(
      () => darkMode.value,
      (newValue) => {
        if (newValue === AppEnum.DARK) {
          setDark();
        } else if (newValue === AppEnum.AUTO) {
          // 自动模式
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDark();
          } else {
            setLight();
          }
        } else {
          setLight();
        }

        setThemeColors(getThemeColors());
      },
      { immediate: true },
    );
  });

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', (e) => {
      if (darkMode.value === AppEnum.AUTO) {
        if (e.matches) {
          setDark();
        } else {
          setLight();
        }
      }
    });

  init();

  onScopeDispose(() => {
    scope.stop();
  });

  return {
    // ...toRefs(projectConfig.value),
    isMobile,
    isDarkMode,
    darkMode,
    beforeMiniInfo,
    setting: projectConfig,

    pageLoading,
    reloadFlag,
    settingDrawerState,
    setSettingDrawerState,
    setReloadFlag,
    setPageLoading,

    getFullContent,
    setFullContent,

    siderCollapse,
    setSiderCollapse,
    toggleSiderCollapse,
    refreshPage,

    getNextDarkMode,
    setDarkMode,
    toggleDarkMode,
    getThemePro,
    setThemePro,
    setThemeAllColor,
    setProjectConfig,
    setMenuSetting,
    getThemeColors,
  };

  // persist: {
  //   key: PINIA_CACHE.PINIA_APP_STORE,
  //   storage: localStorage,
  //   debug: true,
  //   paths: ['beforeMiniInfo'],
  // },
});
