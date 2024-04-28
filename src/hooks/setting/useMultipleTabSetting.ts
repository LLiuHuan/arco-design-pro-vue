import { computed, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFullContent } from '@/hooks/web/useFullContent';

export const useMultipleTabSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();

  // 是否显示多标签页
  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  const getTabHeight = computed(() => appStore.getMultiTabsSetting.height);

  const getShowFold = computed(() => appStore.getMultiTabsSetting.showFold);

  const getShowTabs = computed(() => {
    return unref(getShowMultipleTab) && !unref(getFullContent);
  });

  return {
    getShowMultipleTab,
    getShowFold,
    getShowTabs,
    getTabHeight,
  };
};
