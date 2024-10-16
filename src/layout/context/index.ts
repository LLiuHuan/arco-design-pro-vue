import { useContext } from '@adp/hooks';
import { useRouteStore } from '@/store/modules/route';
import { computed, ref, unref } from 'vue';
import { listenerRouteChange } from '@/utils/router';

export function useMixMenu() {
  const routeStore = useRouteStore();

  const activeFirstLevelMenuKey = ref<string>('');

  function setActiveFirstLevelMenuKey(key: string) {
    activeFirstLevelMenuKey.value = key;
  }

  function getActiveFirstLevelMenuKey(route: RouteLocationNormalized) {
    const routeSplitMark = '_';
    const { hideInMenu, activeMenu } = route.meta;
    const name = route.name as string;
    const routeName = (hideInMenu ? activeMenu : name) || name;

    const [firstLevelRouteName] = routeName.split(routeSplitMark);
    setActiveFirstLevelMenuKey(firstLevelRouteName);
  }

  const menus = computed(() => {
    return (routeStore.menus.find(
      (menu) => menu.key === unref(activeFirstLevelMenuKey),
    )?.children || []) as App.Menu[];
  });

  // 监听路由变化
  // Listen for route changes
  listenerRouteChange((route) => {
    getActiveFirstLevelMenuKey(route);
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
