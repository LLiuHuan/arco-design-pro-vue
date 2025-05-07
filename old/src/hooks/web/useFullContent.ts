import { useAppStore } from '@/store/modules/app';
import { useRouter } from 'vue-router';
import { computed, unref } from 'vue';

/**
 * @description 全屏显示内容
 * @description Full screen display content
 */
export const useFullContent = () => {
  const appStore = useAppStore();
  const router = useRouter();
  const { currentRoute } = router;

  /**
   * @description 是否全屏显示内容，不显示菜单
   * @description Whether to display the content in full screen without displaying the menu
   */
  const getFullContent = computed(() => {
    // Query parameters, the full screen is displayed when the address bar has a full parameter
    const route = unref(currentRoute);
    const { query } = route;
    if (query && Reflect.has(query, '__full__')) {
      return true;
    }
    // Return to the configuration in the configuration file
    return appStore.setting.fullContent;
  });

  /**
   * @description 设置是否全屏显示内容
   * @description Set whether to display the content in full screen
   *
   * @param fullContent 是否全屏显示内容
   */
  const setFullContent = (fullContent: boolean) => {
    appStore.setProjectConfig({ fullContent });
  };

  return { getFullContent, setFullContent };
};
