/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-07 18:52:02
 * @LastEditTime: 2024-08-21 17:59:55
 * @LastEditors: LLiuHuan
 */
import { useAppStore } from '@/store/modules/app';
import type { FooterSetting } from '~/types/config';
import { computed } from 'vue';

export const useFooterSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取菜单配置
   * @description Get menu configuration
   */
  const getFooterSetting = computed(() => appStore.setting.footerSetting);

  /**
   * @description 获取是否显示底部
   * @description Get whether to display the bottom
   */
  const getShowFooter = computed(() => appStore.setting.footerSetting.show);

  /**
   * @description 获取底部高度
   * @description Get footer height
   */
  const getFooterHeight = computed(() => appStore.setting.footerSetting.height);

  /**
   * @description 获取底部固定
   * @description Get footer fixed
   */
  const getFooterFixed = computed(() => appStore.setting.footerSetting.fixed);

  /**
   * @description 获取底部版权
   * @description Get footer copyright
   */
  const getFooterCopyright = computed(() => appStore.setting.copyrightSetting);

  /**
   * @description 设置底部配置
   * @description Set footer configuration
   *
   * @param footerSetting 底部配置
   */
  function setFooterSetting(footerSetting: Partial<FooterSetting>): void {
    appStore.setProjectConfig({ footerSetting });
  }

  return {
    getFooterSetting,
    getShowFooter,
    getFooterHeight,
    getFooterFixed,
    getFooterCopyright,

    setFooterSetting,
  };
};
