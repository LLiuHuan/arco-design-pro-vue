import { useContext } from '@adp/hooks';
import { useRoute } from 'vue-router';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { computed, ref, Ref, unref, watch } from 'vue';

export function useMixMenu() {
  const route = useRoute();
  const { getMenus } = useRouteStoreWithOut();

  const activeFirstLevelMenuKey: Ref<any> = ref('');

  function setActiveFirstLevelMenuKey(key: AuthRoute.RouteKey) {
    activeFirstLevelMenuKey.value = key;
  }

  function getActiveFirstLevelMenuKey() {
    const routeSplitMark = '_';
    const { hideMenu, currentActiveMenu } = route.meta;
    const name = route.name as string;
    const routeName = (hideMenu ? currentActiveMenu : name) || name;

    const [firstLevelRouteName] = routeName.split(routeSplitMark);
    setActiveFirstLevelMenuKey(firstLevelRouteName as PageRoute.RouteKey);
  }

  const menus = computed(() => {
    return (
      getMenus.find((menu) => menu.routeName === unref(activeFirstLevelMenuKey))
        ?.children || []
    );
  });

  // 监听路由变化
  // Listen for route changes
  watch(
    () => route.fullPath,
    () => {
      getActiveFirstLevelMenuKey();
    },
    { immediate: true },
  );

  return {
    activeFirstLevelMenuKey,
    setActiveFirstLevelMenuKey,
    getActiveFirstLevelMenuKey,
    menus,
  };
}

export const { setupStore: setupMixMenuContext, useStore: useMixMenuContext } =
  useContext('mix-menu', useMixMenu);
