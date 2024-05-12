import { useAppStore } from '@/store/modules/app';
import type { FooterSetting } from '~/types/config';
import { computed } from 'vue';

export const useFooterSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取菜单配置
   * @description Get menu configuration
   */
  const getFooterSetting = computed(
    () => appStore.getProjectConfig.footerSetting,
  );

  /**
   * @description 获取是否显示底部
   * @description Get whether to display the bottom
   */
  const getShowFooter = computed(
    () => appStore.getProjectConfig.footerSetting.show,
  );

  /**
   * @description 获取底部高度
   * @description Get footer height
   */
  const getFooterHeight = computed(
    () => appStore.getProjectConfig.footerSetting.height,
  );

  /**
   * @description 获取底部固定
   * @description Get footer fixed
   */
  const getFooterFixed = computed(
    () => appStore.getProjectConfig.footerSetting.fixed,
  );

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

    setFooterSetting,
  };
};
