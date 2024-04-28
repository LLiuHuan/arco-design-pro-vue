import { useAppStore } from '@/store/modules/app';
import { LayoutSetting } from '~/types/config';
import { computed } from 'vue';

export const useLayoutSetting = () => {
  const appStore = useAppStore();

  const getLayoutMode = computed(() => appStore.getLayoutSetting.mode);

  const getLayoutScrollMode = computed(
    () => appStore.getLayoutSetting.scrollMode,
  );

  const setLayoutSetting = (setting: Partial<LayoutSetting>) =>
    appStore.setProjectConfig({ layoutSetting: setting });

  return {
    getLayoutMode,
    getLayoutScrollMode,

    setLayoutSetting,
  };
};
