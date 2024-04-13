import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { HeaderSetting } from '~/types/config';
import { useFullContent } from '@/hooks/web/useFullContent';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';

export const useHeaderSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();
  const { getIsSidebarType, getIsTopMenu, getIsMixSidebar } = useMenuSetting();

  const getShowHeader = computed(() => appStore.getHeaderSetting.show);

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader),
  );

  const getHeaderHeight = computed((): number => {
    return appStore.getHeaderSetting.height;
  });

  const getHeaderShowBreadCrumb = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumb;
  });

  const getHeaderShowBreadCrumbIcon = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumbIcon;
  });

  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) &&
      unref(getShowMixHeaderRef) &&
      unref(getShowHeader) &&
      !unref(getIsTopMenu) &&
      !unref(getIsMixSidebar)
    );
  });

  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const setHeaderSetting = (setting: Partial<HeaderSetting>) => {
    appStore.setProjectConfig({ headerSetting: setting });
  };

  return {
    getShowHeader,
    getHeaderHeight,
    getHeaderShowBreadCrumb,
    getHeaderShowBreadCrumbIcon,
    getShowFullHeaderRef,
    getShowInsetHeaderRef,

    setHeaderSetting,
  };
};
