import { useSettingStore } from '@/store/modules/settings';
import { computed } from 'vue';

export function useProjectSetting() {
  const projectStore = useSettingStore();

  const getMenuSetting = computed(() => projectStore.menuSetting);

  const getPermissionMode = computed(() => projectStore.permissionMode);

  return {
    getMenuSetting,
    getPermissionMode,
  };
}
