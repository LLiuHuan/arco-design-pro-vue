import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { computed } from 'vue';

export const useErrorLog = () => {
  const errorLogStore = useErrorLogStoreWithOut();
  const getErrorLogList = computed(() => errorLogStore.getErrorLogInfoList);

  return { getErrorLogList };
};
