import { store } from '@/store';
import { defineStore } from 'pinia';
import type { ErrorLogInfo } from '~/types/storage';
import { formatToDateTime } from '@/utils';
import { ErrorTypeEnum } from '@/enums';
import { appSetting } from '@/settings';

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
    // Get error log list - [获取错误日志列表]
    getErrorLogInfoList(state): ErrorLogInfo[] {
      return state.errorLogInfoList || [];
    },
    // Get error log list count - [获取错误日志列表数量]
    getErrorLogListCount(state): number {
      return state.errorLogListCount;
    },
  },
  actions: {
    // Add error log information - [添加错误日志信息]
    addErrorLogInfo(info: ErrorLogInfo) {
      const item = {
        ...info,
        time: formatToDateTime(new Date()),
      };
      this.errorLogInfoList = [item, ...(this.errorLogInfoList || [])];
      this.errorLogListCount += 1;
    },
    // Set the number of error log lists - [设置错误日志列表数量]
    setErrorLogListCount(count: number): void {
      this.errorLogListCount = count;
    },

    /**
     * Triggered after ajax request error - [ajax 请求错误后触发]
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

// Need to be used outside the setup - [需要在设置外部使用]
export function useErrorLogStoreWithOut() {
  return useErrorLogStore(store);
}
