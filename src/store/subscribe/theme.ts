import { effectScope, onScopeDispose, unref, watch } from 'vue';
import { AppEnum } from '@/enums';
import { useRootSetting } from '@/hooks/setting';
import { useAppStore } from '../modules/app';

/** 订阅theme store */
export default function subscribeThemeStore() {
  const theme = useAppStore();

  const setDarkMode = () => {
    // 设置为暗黑主题
    document.body.setAttribute('arco-theme', AppEnum.DARK);
    document.documentElement.classList.add(AppEnum.DARK);
  };

  const setLightMode = () => {
    // 恢复亮色主题
    document.body.removeAttribute('arco-theme');
    document.documentElement.classList.remove(AppEnum.DARK, AppEnum.LIGHT);
  };

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => theme.darkMode,
      (newValue) => {
        if (newValue === AppEnum.DARK) {
          setDarkMode();
        } else if (newValue === AppEnum.AUTO) {
          // 自动模式
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode();
          } else {
            setLightMode();
          }
        } else {
          setLightMode();
        }

        // setThemeColors(theme.getThemeColors);
        const { setThemePro, setThemeAllColor, getThemePro } = useRootSetting();
        setThemePro(unref(getThemePro)).then(() => {
          setThemeAllColor(theme.getThemeColors);
        });
      },
      { immediate: true },
    );

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (theme.darkMode === AppEnum.AUTO) {
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
