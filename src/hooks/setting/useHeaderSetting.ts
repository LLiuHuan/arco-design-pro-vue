import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { HeaderSetting } from '~/types/config';

export const useHeaderSetting = () => {
  const appStore = useAppStore();

  const getHeaderHeight = computed((): number => {
    return appStore.getHeaderSetting.height;
  });

  const getHeaderShowBreadCrumb = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumb;
  });

  const getHeaderShowBreadCrumbIcon = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumbIcon;
  });

  const setHeaderSetting = (setting: Partial<HeaderSetting>) => {
    appStore.setProjectConfig({ headerSetting: setting });
  };

  return {
    getHeaderHeight,
    getHeaderShowBreadCrumb,
    getHeaderShowBreadCrumbIcon,

    setHeaderSetting,
  };
};
