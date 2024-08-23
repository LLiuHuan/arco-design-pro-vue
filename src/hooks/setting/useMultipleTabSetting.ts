/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-07 18:52:02
 * @LastEditTime: 2024-08-23 17:28:14
 * @LastEditors: LLiuHuan
 */
import { computed, unref } from 'vue';
import { useAppStore } from '@/store/modules/app';
import { useFullContent } from '@/hooks/web/useFullContent';

export const useMultipleTabSetting = () => {
  const appStore = useAppStore();
  const { getFullContent } = useFullContent();

  /**
   * @description 获取是否显示多标签页
   * @description Get whether to display multiple tabs
   */
  const getShowMultipleTab = computed(
    () => appStore.setting.multiTabsSetting.show,
  );

  /**
   * @description 获取多标签页高度
   * @description Get tab height
   */
  const getTabHeight = computed(() => appStore.setting.multiTabsSetting.height);

  /**
   * @description 获取是否显示快捷操作
   * @description Get whether to display quick operations
   */
  const getShowQuick = computed(
    () => appStore.setting.multiTabsSetting.showQuick,
  );

  /**
   * @description 获取是否显示刷新
   * @description Get whether to display refresh
   */
  const getShowRedo = computed(
    () => appStore.setting.multiTabsSetting.showRedo,
  );

  /**
   * @description 获取是否显示折叠
   * @description Get whether to display the fold
   */
  const getShowFold = computed(
    () => appStore.setting.multiTabsSetting.showFold,
  );

  /**
   * @description 获取折叠自动收起
   * @description Get fold auto collapse
   */
  const getFoldAutoCollapse = computed(
    () => appStore.setting.multiTabsSetting.autoCollapse,
  );

  /**
   * @description 获取标签是否开启缓存
   * @description Get whether the label is cached
   */
  const getTabOpenCache = computed(() => {
    return appStore.setting.multiTabsSetting.cache;
  });

  const getShowTabs = computed(() => {
    return unref(getShowMultipleTab) && !unref(getFullContent);
  });

  return {
    getShowMultipleTab,
    getShowQuick,
    getShowRedo,
    getShowFold,
    getShowTabs,
    getTabHeight,
    getFoldAutoCollapse,
    getTabOpenCache,
  };
};
