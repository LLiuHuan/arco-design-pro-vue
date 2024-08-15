import { useContext } from '@adp/hooks';
import { useRoute } from 'vue-router';
import { useRouteStore } from '@/store/modules/route';
import { computed, ref, unref } from 'vue';
import { listenerRouteChange } from '@/utils/router';

export function useMixMenu() {
  const route = useRoute();
  const { menus: getMenus } = useRouteStore();

  const activeFirstLevelMenuKey = ref('');

  function setActiveFirstLevelMenuKey(key: string) {
    activeFirstLevelMenuKey.value = key;
  }

  function getActiveFirstLevelMenuKey() {
    const routeSplitMark = '_';
    const { hideInMenu, activeMenu } = route.meta;
    const name = route.name as string;
    const routeName = (hideInMenu ? activeMenu : name) || name;

    const [firstLevelRouteName] = routeName.split(routeSplitMark);
    setActiveFirstLevelMenuKey(firstLevelRouteName);
  }

  const menus = computed(() => {
    return (
      getMenus.find((menu) => menu.key === unref(activeFirstLevelMenuKey))
        ?.children || []
    );
  });

  // 监听路由变化
  // Listen for route changes
  listenerRouteChange(() => {
    getActiveFirstLevelMenuKey();
  });

  return {
    activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey,
    getActiveFirstLevelMenuKey,
    menus,
  };
}

export const { setupStore: setupMixMenuContext, useStore: useMixMenuContext } =
  useContext('mix-menu', useMixMenu);
