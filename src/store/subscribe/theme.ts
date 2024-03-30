import { effectScope, onScopeDispose, watch } from 'vue';
import { ThemeColorEnum, ThemeEnum } from '@/enums';
import { setBaseColor } from '@/utils/common';
import { useAppStore } from '../modules/app';

/** 订阅theme store */
export default function subscribeThemeStore() {
  const theme = useAppStore();

  const setDarkMode = () => {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', ThemeEnum.DARK);
    document.documentElement.classList.add(ThemeEnum.DARK);
    Object.keys(theme.getThemeSetting).forEach((key: ThemeColorEnum) => {
      setBaseColor(theme.getThemeSetting[key], key, true);
    });
  };

  const setLightMode = () => {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
    document.documentElement.classList.remove(ThemeEnum.DARK, ThemeEnum.LIGHT);
    Object.keys(theme.getThemeSetting).forEach((key: ThemeColorEnum) => {
      setBaseColor(theme.getThemeSetting[key], key);
    });
  };

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => theme.darkMode,
      (newValue) => {
        if (newValue === ThemeEnum.DARK) {
          setDarkMode();
        } else if (newValue === ThemeEnum.AUTO) {
          // 自动模式
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode();
          } else {
            setLightMode();
          }
        } else {
          setLightMode();
        }
      },
      { immediate: true },
    );

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (theme.darkMode === ThemeEnum.AUTO) {
          if (e.matches) {
            setDarkMode();
          } else {
            setLightMode();
          }
        }
      });
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
