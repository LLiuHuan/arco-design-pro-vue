import { store } from '@/store';
import { defineStore } from 'pinia';
import type { ErrorLogInfo } from '~/types/storage';
import { ErrorTypeEnum } from '@/enums';
import { appSetting } from '@/settings';
import { formatToDateTime } from '@/utils/date';
import { unref } from 'vue';

export interface ErrorLogState {
  errorLogInfoList: Nullable<ErrorLogInfo[]>;
  errorLogListCount: number;
}

export const useErrorLogStore = defineStore({
  id: 'store-error-log',
  state: (): ErrorLogState => ({
    errorLogInfoList: null,
    errorLogListCount: 0,
  }),
  getters: {
    /**
     * @description 获取错误日志列表
     * @description Get the error log list
     * @param state
     */
    getErrorLogInfoList(state): ErrorLogInfo[] {
      return state.errorLogInfoList ?? [];
    },
    /**
     * @description 获取错误日志列表数量
     * @description Get the number of error log lists
     * @param state
     */
    getErrorLogListCount(state): number {
      return state.errorLogListCount;
    },
  },
  actions: {
    /**
     * @description 添加错误日志信息
     * @description Add error log information
     * @param info
     */
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      };
      this.errorLogInfoList = [item, ...(unref(this.errorLogInfoList) ?? [])];
      this.errorLogListCount += 1;
    },
    /**
     * @description 设置错误日志列表数量
     * @description Set the number of error log lists
     * @param count
     */
    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count;
    },

    /**
     * @description ajax 请求错误后触发
     * @description Triggered after ajax request error
     * @param error
     * @returns
     */
    addAjaxErrorInfo(error: any) {
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
      this.addErrorLogInfo(errInfo as ErrorLogInfo);
    },
  },
});

// 需要在设置外部使用
// Need to be used outside the setup
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
