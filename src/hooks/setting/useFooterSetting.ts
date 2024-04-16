import { useAppStore } from '@/store/modules/app';
import type { FooterSetting } from '~/types/config';
import { computed } from 'vue';

export const useFooterSetting = () => {
  const appStore = useAppStore();

  const getFooterSetting = computed(
    () => appStore.getProjectConfig.footerSetting,
  );

  const getShowFooter = computed(
    () => appStore.getProjectConfig.footerSetting.show,
  );

  const getFooterHeight = computed(
    () => appStore.getProjectConfig.footerSetting.height,
  );

  // 设置菜单配置
  function setFooterSetting(footerSetting: Partial<FooterSetting>): void {
    appStore.setProjectConfig({ footerSetting });
  }

  return {
    getFooterSetting,
    getShowFooter,
    getFooterHeight,

    setFooterSetting,
  };
};
