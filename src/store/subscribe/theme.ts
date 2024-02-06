import { effectScope, onScopeDispose, watch } from 'vue';
import { useThemeStore } from '../modules';

/** 订阅theme store */
export default function subscribeThemeStore() {
  const theme = useThemeStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => theme.darkMode,
      (newValue) => {
        if (newValue === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
