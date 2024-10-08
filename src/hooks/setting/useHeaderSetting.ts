import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';
import { HeaderSetting } from '~/types/config';

export const useHeaderSetting = () => {
  const appStore = useAppStore();

  /**
   * @description 获取是否显示顶部
   * @description Get whether to display the top
   */
  const getShowHeader = computed(() => appStore.setting.headerSetting.show);

  /**
   * @description 获取顶部高度
   * @description Get top height
   */
  const getHeaderHeight = computed((): number => {
    return appStore.setting.headerSetting.height;
  });

  /**
   * @description 获取header是否显示面包屑
   * @description Get whether the header displays breadcrumbs
   */
  const getHeaderShowBreadCrumb = computed((): boolean => {
    return appStore.setting.headerSetting.showBreadCrumb;
  });

  /**
   * @description 获取header是否显示面包屑图标
   * @description Get whether the header displays the breadcrumb icon
   */
  const getHeaderShowBreadCrumbIcon = computed((): boolean => {
    return appStore.setting.headerSetting.showBreadCrumbIcon;
  });

  /**
   * @description 设置header配置
   * @description Set header configuration
   *
   * @param setting
   */
  const setHeaderSetting = (setting: Partial<HeaderSetting>) => {
    appStore.setProjectConfig({ headerSetting: setting });
  };

  return {
    getShowHeader,
    getHeaderHeight,
    getHeaderShowBreadCrumb,
    getHeaderShowBreadCrumbIcon,

    setHeaderSetting,
  };
};
