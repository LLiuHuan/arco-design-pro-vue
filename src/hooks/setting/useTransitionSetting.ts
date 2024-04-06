import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { TransitionSetting } from '~/types/config';

export const useTransitionSetting = () => {
  const appStore = useAppStore();

  /**
   * @description: Get whether switching animation is enabled - [获取是否开启切换动画]
   */
  const getEnableTransition = computed(
    () => appStore.getTransitionSetting?.enable,
  );

  /**
   * @description: Get whether to open the top progress bar - [获取是否开启顶部进度条]
   */
  const getOpenNProgress = computed(
    () => appStore.getTransitionSetting?.openNProgress,
  );

  /**
   * @description: Get whether to open page switching loading - [获取是否开启页面切换loading]
   */
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.getTransitionSetting?.openPageLoading;
  });

  /**
   * @description: Get basic transition - [获取基本切换动画]
   */
  const getBasicTransition = computed(
    () => appStore.getTransitionSetting?.basicTransition,
  );

  /**
   * @description: Set switching animation - [设置切换动画]
   * @param transitionSetting
   */
  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setProjectConfig({ transitionSetting });
  }
  return {
    getEnableTransition,
    getOpenNProgress,
    getOpenPageLoading,
    getBasicTransition,

    setTransitionSetting,
  };
};
