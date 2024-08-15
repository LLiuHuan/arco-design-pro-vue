import { defineStore } from 'pinia';
import type { ErrorLogInfo } from '~/types/storage';
import { ErrorTypeEnum, StoreEnum } from '@/enums';
import { Ref, ref } from 'vue';
import { formatToDateTime } from '@/utils/date';
import { appSetting } from '@/settings';

export const useErrorLogStore = defineStore(StoreEnum.ErrorLog, () => {
  const errorLogInfoList: Ref<ErrorLogInfo[]> = ref([]);
  const errorLogListCount: Ref<number> = ref(0);

  /**
   * @description 添加错误日志信息
   * @description Add error log information
   * @param info
   */
  function addErrorLogInfo(info: ErrorLogInfo) {
    const item = {
      ...info,
      time: formatToDateTime(new Date()),
    };
    errorLogInfoList.value = [item, ...(errorLogInfoList.value ?? [])];
    errorLogListCount.value += 1;
  }

  /**
   * @description 设置错误日志列表数量
   * @description Set the number of error log lists
   * @param count
   */
  function setErrorLogListCount(count: number): void {
    errorLogListCount.value = count;
  }

  /**
   * @description ajax 请求错误后触发
   * @description Triggered after ajax request error
   * @param error
   * @returns
   */
  function addAjaxErrorInfo(error: any) {
    const { useErrorHandle } = appSetting;
    if (!useErrorHandle) {
      return;
    }
    const errInfo: Partial<ErrorLogInfo> = {
      message: error.message,
      type: ErrorTypeEnum.AJAX,
    };
    if (error.response) {
      const {
        config: {
          url = '',
          data: params = '',
          method = 'get',
          headers = {},
        } = {},
        data = {},
      } = error.response;
      errInfo.url = url;
      errInfo.name = 'Ajax Error!';
      errInfo.file = '-';
      errInfo.stack = JSON.stringify(data);
      errInfo.detail = JSON.stringify({ params, method, headers });
    }
    addErrorLogInfo(errInfo as ErrorLogInfo);
  }

  return {
    errorLogInfoList,
    errorLogListCount,

    addErrorLogInfo,
    setErrorLogListCount,
    addAjaxErrorInfo,
  };
});
