import { effectScope, onScopeDispose, watch } from 'vue';
import { ThemeEnum } from '@/enums';
import { useThemeStore } from '../modules';

/** 订阅theme store */
export default function subscribeThemeStore() {
  const theme = useThemeStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => theme.darkMode,
      (newValue) => {
        if (newValue === ThemeEnum.DARK) {
          // 设置为暗黑主题
          document.body.setAttribute('arco-theme', ThemeEnum.DARK);
          document.documentElement.classList.add(ThemeEnum.DARK);
        } else {
          // 恢复亮色主题
          document.body.removeAttribute('arco-theme');
          document.documentElement.classList.remove(ThemeEnum.DARK);
        }
        // useToggle(newValue === 'dark');
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
