import { useAppStore } from '@/store/modules/app';
import { computed, unref } from 'vue';
import { HeaderSetting } from '~/types/config';
import { useFullContent } from '@/hooks/web/useFullContent';
import { useMenuSetting } from '@/hooks/setting/useMenuSetting';
import { MenuModeEnum } from '@/enums';
import { useRootSetting } from '@/hooks/setting/useRootSetting';
import { useLayoutSetting } from '@/hooks/setting/useLayoutSetting';

export const useHeaderSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();
  const {
    getIsSidebarType,
    getIsTopMenu,
    getIsTopMixSidebar,
    getIsMixSidebar,
  } = useMenuSetting();

  const getShowHeader = computed(() => appStore.getHeaderSetting.show);

  const getShowMixHeaderRef = computed(
    () => !unref(getIsSidebarType) && unref(getShowHeader), // 显示顶部菜单并且显示左侧菜单
  );

  const getHeaderHeight = computed((): number => {
    return appStore.getHeaderSetting.height;
  });

  // header 是否显示面包屑
  // Whether to display breadcrumbs
  const getHeaderShowBreadCrumb = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumb;
  });

  // header 是否显示面包屑图标
  // Whether to display the breadcrumb icon
  const getHeaderShowBreadCrumbIcon = computed((): boolean => {
    return appStore.getHeaderSetting.showBreadCrumbIcon;
  });

  // 是否显示全屏header
  // Whether to display full screen header
  const getShowFullHeaderRef = computed(() => {
    return (
      !unref(getFullContent) && // 不是全屏内容
      unref(getShowMixHeaderRef) && // 是混合顶部菜单
      unref(getShowHeader) && // 显示header
      !unref(getIsTopMenu) && // 不是顶部菜单
      !unref(getIsMixSidebar) // 不是混合左侧菜单
    );
  });

  // 是否显示内嵌header
  // Whether to display the embedded header
  const getShowInsetHeaderRef = computed(() => {
    const need = !unref(getFullContent) && unref(getShowHeader);
    console.log(need);
    return (
      (need && !unref(getShowMixHeaderRef)) ||
      (need && unref(getIsTopMenu)) ||
      (need && unref(getIsTopMixSidebar)) ||
      (need && unref(getIsMixSidebar))
    );
  });

  const { getShowHeaderTrigger } = useMenuSetting();
  const { getLayoutMode } = useLayoutSetting();
  const { getShowLogo } = useRootSetting();

  // 是否显示面包屑
  // Whether to display breadcrumbs
  const getShowBread = computed(() => {
    return (
      unref(getLayoutMode) !== MenuModeEnum.HORIZONTAL &&
      unref(getHeaderShowBreadCrumb)
    );
  });

  // 是否显示header logo
  const getShowHeaderLogo = computed(() => {
    return (
      unref(getShowLogo) && !unref(getIsSidebarType) && !unref(getIsMixSidebar)
    );
  });

  // 是否显示内容
  // Whether to display content
  const getShowContent = computed(() => {
    return unref(getShowBread) || unref(getShowHeaderTrigger);
  });

  // 设置header配置
  // Set header configuration
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
    getShowBread,
    getShowHeaderLogo,
    getShowContent,

    setHeaderSetting,
  };
};
