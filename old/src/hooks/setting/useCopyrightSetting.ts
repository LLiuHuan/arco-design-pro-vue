/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-21 18:04:52
 * @LastEditTime: 2024-08-21 18:12:19
 * @LastEditors: LLiuHuan
 */
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export const useCopyrightSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 是否开启底部版权
   * @description Whether to enable the bottom copyright
   */
  const getCopyrightShow = computed(
    () => appStore.setting.copyrightSetting?.show,
  );

  /**
   * @description 公司名称
   * @description Company name
   */
  const getCompany = computed(() => appStore.setting.copyrightSetting?.company);

  /**
   * @description 公司链接
   * @description Company link
   */
  const getCompanyLink = computed(
    () => appStore.setting.copyrightSetting?.companyHref,
  );

  /**
   * @description 备案号
   * @description Record number
   */
  const getRecord = computed(() => appStore.setting.copyrightSetting?.record);

  /**
   * @description 备案链接
   * @description Record link
   */
  const getRecordLink = computed(
    () => appStore.setting.copyrightSetting?.recordHref,
  );

  /**
   * @description 公安备案号
   * @description Public security record number
   */
  const getPolice = computed(() => appStore.setting.copyrightSetting?.police);

  /**
   * @description 公安备案链接
   * @description Public security record link
   */
  const getPoliceLink = computed(
    () => appStore.setting.copyrightSetting?.policeHref,
  );

  return {
    getCopyrightShow,
    getCompany,
    getCompanyLink,
    getRecord,
    getRecordLink,
    getPolice,
    getPoliceLink,
  };
};
