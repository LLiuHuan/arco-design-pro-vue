import { computed } from 'vue';
import { useSettingStore } from '@/store/modules/settings';

export function useProjectSetting() {
  const projectStore = useSettingStore();

  const getNavMode = computed(() => projectStore.navMode);

  const getMenuSetting = computed(() => projectStore.menuSetting);

  const getHeaderSetting = computed(() => projectStore.headerSetting);

  const getPermissionMode = computed(() => projectStore.permissionMode);

  const getShowFooter = computed(() => projectStore.showFooter);

  const getIsPageAnimate = computed(() => projectStore.isPageAnimate);

  const getPageAnimateType = computed(() => projectStore.pageAnimateType);

  const getMultiTabsSetting = computed(() => projectStore.multiTabsSetting);

  const getCrumbsSetting = computed(() => projectStore.crumbsSetting);

  return {
    getNavMode,
    getMenuSetting,
    getHeaderSetting,
    getPermissionMode,
    getShowFooter,
    getIsPageAnimate,
    getPageAnimateType,
    getMultiTabsSetting,
    getCrumbsSetting,
  };
}
