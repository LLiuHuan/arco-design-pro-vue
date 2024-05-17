import { computed, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFullContent } from '@/hooks/web/useFullContent';

export const useMultipleTabSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();

  /**
   * @description 获取是否显示多标签页
   * @description Get whether to display multiple tabs
   */
  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  /**
   * @description 获取多标签页高度
   * @description Get tab height
   */
  const getTabHeight = computed(() => appStore.getMultiTabsSetting.height);

  /**
   * @description 获取是否显示快捷操作
   * @description Get whether to display quick operations
   */
  const getShowQuick = computed(() => appStore.getMultiTabsSetting.showQuick);

  /**
   * @description 获取是否显示刷新
   * @description Get whether to display refresh
   */
  const getShowRedo = computed(() => appStore.getMultiTabsSetting.showRedo);

  /**
   * @description 获取是否显示折叠
   * @description Get whether to display the fold
   */
  const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold);

  /**
   * @description 获取折叠自动收起
   * @description Get fold auto collapse
   */
  const getFoldAutoCollapse = computed(
    () => appStore.getMultiTabsSetting.autoCollapse,
  );

  const getShowTabs = computed(() => {
    return unref(getShowMultipleTab) && !unref(getFullContent);
  });

  return {
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
    getShowTabs,
    getTabHeight,
    getFoldAutoCollapse,
  };
};
