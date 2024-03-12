import { computed } from 'vue';
import { useAppStore } from '@/store';

export function useMultipleTabSetting() {
  const appStore = useAppStore();

  // 是否显示多标签页
  const getShowMultipleTab = computed(() => appStore.getMultiTabsSetting.show);

  return {
    getShowMultipleTab,
  };
}
