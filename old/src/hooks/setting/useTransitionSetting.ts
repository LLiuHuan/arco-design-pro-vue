import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { TransitionSetting } from '~/types/config';

export const useTransitionSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取是否开启切换动画
   * @description: Get whether switching animation is enabled
   */
  const getEnableTransition = computed(
    () => appStore.setting.transitionSetting?.enable,
  );

  /**
   * @description 获取是否开启顶部进度条
   * @description: Get whether to open the top progress bar
   */
  const getOpenNProgress = computed(
    () => appStore.setting.transitionSetting?.openNProgress,
  );

  /**
   * @description 获取是否开启页面切换loading
   * @description: Get whether to open page switching loading
   */
  const getOpenPageLoading = computed((): boolean => {
    return !!appStore.setting.transitionSetting?.openPageLoading;
  });

  /**
   * @description 获取基本切换动画
   * @description: Get basic transition
   */
  const getBasicTransition = computed(
    () => appStore.setting.transitionSetting?.basicTransition,
  );

  /**
   * @description 设置切换动画
   * @description: Set switching animation
   *
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
