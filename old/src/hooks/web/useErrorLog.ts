import { useErrorLogStore } from '@/store/modules/errorLog';
import { computed } from 'vue';

export const useErrorLog = () => {
  const errorLogStore = useErrorLogStore();

  /**
   * @description: 获取错误日志列表
   * @description: Get error log list
   */
  const getErrorLogList = computed(() => errorLogStore.errorLogInfoList ?? []);

  return { getErrorLogList };
};
