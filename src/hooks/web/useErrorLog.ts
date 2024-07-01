import { useErrorLogStoreWithOut } from '@/store/modules/errorLog';
import { computed } from 'vue';

export const useErrorLog = () => {
  const errorLogStore = useErrorLogStoreWithOut();

  /**
   * @description: 获取错误日志列表
   * @description: Get error log list
   */
  const getErrorLogList = computed(
    () => errorLogStore.getErrorLogInfoList ?? [],
  );

  return { getErrorLogList };
};
