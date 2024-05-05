import { useAppStore } from '@/store/modules/app';
import { useEventListener, useWindowSize } from '@vueuse/core';
import { AppEnum, screenMap, sizeEnum } from '@/enums';
import { effectScope, onScopeDispose, ref, unref, watch } from 'vue';

/**
 * @description 订阅是否是移动端 store
 */
export default function subscribeMobileStore() {
  const appStore = useAppStore();
  // const screenRef = ref<sizeEnum>(sizeEnum.XL);
  // const realWidthRef = ref(window.innerWidth);
  //
  // function getWindowWidth() {
  //   const width = document.body.clientWidth;
  //   const xs = screenMap.get(sizeEnum.XS)!;
  //   const sm = screenMap.get(sizeEnum.SM)!;
  //   const md = screenMap.get(sizeEnum.MD)!;
  //   const lg = screenMap.get(sizeEnum.LG)!;
  //   const xl = screenMap.get(sizeEnum.XL)!;
  //   if (width < xs) {
  //     screenRef.value = sizeEnum.XS;
  //   } else if (width < sm) {
  //     screenRef.value = sizeEnum.SM;
  //   } else if (width < md) {
  //     screenRef.value = sizeEnum.MD;
  //   } else if (width < lg) {
  //     screenRef.value = sizeEnum.LG;
  //   } else if (width < xl) {
  //     screenRef.value = sizeEnum.XL;
  //   } else {
  //     screenRef.value = sizeEnum.XXL;
  //   }
  //   realWidthRef.value = width;
  // }
  //
  // function resizeFn() {
  //   const lgWidth = screenMap.get(sizeEnum.LG);
  //   if (lgWidth) {
  //     appStore.setMobile(screenMap.get(unref(screenRef)!)! - 1 < lgWidth);
  //   }
  // }
  //
  // useEventListener(window, 'resize', () => {
  //   getWindowWidth();
  //   resizeFn();
  // });

  const { width } = useWindowSize();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => unref(width),
      (newValue) => {
        appStore.setMobile(unref(newValue) - 1 < 576);
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
