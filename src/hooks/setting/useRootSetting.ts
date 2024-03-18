import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export const useRootSetting = () => {
  const appStore = useAppStore();

  // 获取页面是否开启keep-alive
  const getOpenKeepAlive = computed(
    () => appStore.getProjectConfig.openKeepAlive,
  );

  // 获取是否可以嵌入iframe页面
  const getCanEmbedIFramePage = computed(
    () => appStore.getProjectConfig.canEmbedIFramePage,
  );

  return {
    getOpenKeepAlive,
    getCanEmbedIFramePage,
  };
};
