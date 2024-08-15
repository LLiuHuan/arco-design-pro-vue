import { useAppStore } from '@/store/modules/app';
import { LayoutSetting } from '~/types/config';
import { computed } from 'vue';

export const useLayoutSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取布局模式
   * @description Get layout mode
   */
  const getLayoutMode = computed(() => appStore.setting.layoutSetting.mode);

  /**
   * @description 获取布局滚动模式
   * @description Get layout scroll mode
   */
  const getLayoutScrollMode = computed(
    () => appStore.setting.layoutSetting.scrollMode,
  );

  /**
   * @description 设置布局配置
   * @description Set layout configuration
   *
   * @param setting
   */
  const setLayoutSetting = (setting: Partial<LayoutSetting>) =>
    appStore.setProjectConfig({ layoutSetting: setting });

  return {
    getLayoutMode,
    getLayoutScrollMode,

    setLayoutSetting,
  };
};
