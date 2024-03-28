import { effectScope, onScopeDispose, watch } from 'vue';
import { ThemeEnum } from '@/enums';
import { useAppStore } from '../modules/app';

/** 订阅theme store */
export default function subscribeThemeStore() {
  const theme = useAppStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => theme.darkMode,
      (newValue) => {
        if (newValue === ThemeEnum.DARK) {
          // 设置为暗黑主题
          document.body.setAttribute('arco-theme', ThemeEnum.DARK);
          document.documentElement.classList.add(ThemeEnum.DARK);
        } else if (newValue === ThemeEnum.AUTO) {
          // 自动模式
          if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            // 设置为暗黑主题
            document.body.setAttribute('arco-theme', ThemeEnum.DARK);
            document.documentElement.classList.add(ThemeEnum.DARK);
          } else {
            // 恢复亮色主题
            document.body.removeAttribute('arco-theme');
            document.documentElement.classList.remove(ThemeEnum.DARK);
          }
        } else {
          // 恢复亮色主题
          document.body.removeAttribute('arco-theme');
          document.documentElement.classList.remove(ThemeEnum.DARK);
        }
      },
      { immediate: true },
    );

    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', (e) => {
        if (theme.darkMode === ThemeEnum.AUTO) {
          if (e.matches) {
            document.body.setAttribute('arco-theme', ThemeEnum.DARK);
            document.documentElement.classList.add(ThemeEnum.DARK);
          } else {
            document.body.removeAttribute('arco-theme');
            document.documentElement.classList.remove(ThemeEnum.DARK);
          }
        }
      });
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
