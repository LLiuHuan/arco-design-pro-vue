import { useAppStore } from '@/store/modules/app';
import { useDebounceFn, useWindowSize } from '@vueuse/core';
import { effectScope, onScopeDispose, unref, watch } from 'vue';

/**
 * @description 订阅是否是移动端 store
 */
export default function subscribeMobileStore() {
  const appStore = useAppStore();

  const { width } = useWindowSize();

  const setMobileFn = useDebounceFn((newWidth: number) => {
    appStore.setMobile(unref(newWidth) - 1 < 576);
  }, 20);

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => unref(width),
      (newValue) => {
        setMobileFn(newValue);
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
