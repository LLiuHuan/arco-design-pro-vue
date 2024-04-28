import { computed, Ref, ref, unref, watch } from 'vue';
import { useRouteStoreWithOut } from '@/store/modules/route';
import { getRouteRootName } from '@/utils/router';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

function useMixMenu() {
  const route = useRoute();
  const { getMenus } = useRouteStoreWithOut();

  const activeFirstLevelMenuKey: Ref<any> = ref('');

  function setActiveFirstLevelMenuKey(key: AuthRoute.RouteKey) {
    console.log(activeFirstLevelMenuKey.value, key);
    activeFirstLevelMenuKey.value = key;
  }

  function getActiveFirstLevelMenuKey() {
    const firstLevelRouteName = getRouteRootName(route);
    setActiveFirstLevelMenuKey(firstLevelRouteName);
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

export { useMixMenu };
