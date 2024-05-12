<template>
  <div
    v-click-outside="handleClickOutside"
    class="h-full flex"
    v-bind="getMenuEvents"
  >
    <FirstLevelMenu :active-menu-key="activeName" @select="handleSelectMixMenu">
      <slot />
    </FirstLevelMenu>
    <div
      class="relative h-full transition-base"
      :style="{ width: getMixSideFixed ? `${getMixChildMenuWidth}px` : '0px' }"
    >
      <div
        class="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-base bg-[var(--color-bg-2)]"
        :style="{
          width: unref(showDrawer) ? `${getMixChildMenuWidth}px` : '0px',
        }"
      >
        <header
          class="flex-y-center justify-between"
          :style="{ height: `${getHeaderHeight}px` }"
        >
          <h2 class="pl-8px text-16px text-primary font-bold">
            {{ VITE_GLOB_APP_TITLE }}
          </h2>
          <div class="cursor-pointer pr-10px" @click="handleFixedMenu">
            <SvgIcon
              v-if="getMixSideFixed"
              class="cursor-pointer !text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]"
              icon="ri:pushpin-2-fill"
            />
            <SvgIcon
              v-else
              class="cursor-pointer !text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]"
              icon="ri:pushpin-2-line"
            />
          </div>
        </header>

        <LayoutMenu class="flex-1" :menus="childrenMenus" :collapsed="false" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useRouteStore } from '@/store/modules/route';
  import { computed, ref, unref, watch } from 'vue';
  import { App } from '~/types/app';
  import {
    useGlobSetting,
    useHeaderSetting,
    useMenuSetting,
  } from '@/hooks/setting';
  import { getActiveKeyPathsOfMenus } from '@/utils/router';
  import { RouteLocationNormalized, useRoute } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import vClickOutside from '@/directives/clickOutside';
  import { SvgIcon } from '@/components/Icon';
  import LayoutMenu from '@/layout/common/menu/components/base-menu/index.vue';
  import FirstLevelMenu from '../first-level-menu/index.vue';

  const { getMenus } = useRouteStore();
  const {
    getMixSideFixed,
    isVerticalMix,
    getCloseMixSidebarOnChange,
    getMixChildMenuWidth,
    setMenuSetting,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { VITE_GLOB_APP_TITLE } = useGlobSetting();

  const route = useRoute();

  const activeName = ref(''); // 当前活动菜单
  const openMenu = ref(false); // 是否打开子菜单
  const childrenMenus = ref<App.Menu[]>([]); // 子菜单
  const currentRoute = ref<RouteLocationNormalized | null>(null); // 当前路由

  // 是否显示子菜单
  // Whether to show the drawer
  const showDrawer = computed(
    () => (unref(openMenu) && unref(childrenMenus).length) || getMixSideFixed,
  );

  // 是否固定子菜单
  // Whether to fix the drawer
  const handleFixedMenu = () => {
    setMenuSetting({
      mixSideFixed: !unref(getMixSideFixed),
    });
  };

  const { goKey } = useGo();

  // 获取是否固定
  // Get whether it is fixed
  const getIsFixed = computed(
    () => unref(getMixSideFixed) && unref(childrenMenus).length > 0,
  );

  // 关闭子菜单
  // Turn off the sub -menu
  const closeMenu = () => {
    openMenu.value = unref(getIsFixed);
  };

  // 设置当前活动菜单和子菜单
  // Set the currently active menu and submenu
  const setActive = async (setChildren = false) => {
    const activeKey = (unref(currentRoute)?.meta?.currentActiveMenu ||
      unref(currentRoute)?.name) as string;
    const activeKeys = getActiveKeyPathsOfMenus(activeKey, getMenus);
    if (!activeKeys) return;
    activeName.value = activeKeys ? activeKeys[0] : '';
    if (unref(isVerticalMix)) {
      const activeMenu = unref(getMenus).find(
        (item) => item.routeName === unref(activeName),
      );
      if (activeMenu?.children) {
        if (setChildren) {
          childrenMenus.value = activeMenu?.children;

          if (unref(getMixSideFixed)) {
            openMenu.value = activeMenu?.children.length > 0;
          }
        }
        if (activeMenu?.children.length === 0) {
          childrenMenus.value = [];
        }
      }
    }
  };

  // 点击菜单触发
  // Click the menu to trigger
  const handleSelectMixMenu = (item: App.Menu, hover: boolean) => {
    const { routeName, children } = item;
    if (unref(activeName) === routeName) {
      if (!hover) {
        if (!unref(openMenu)) {
          openMenu.value = true;
        } else {
          closeMenu();
        }
      } else if (!unref(openMenu)) {
        openMenu.value = true;
      }

      if (!unref(openMenu)) {
        setActive();
      }
    } else {
      openMenu.value = true;
      activeName.value = routeName;
    }

    if (!children || children.length === 0) {
      if (!hover) goKey(routeName);
      childrenMenus.value = [];
      closeMenu();
      return;
    }

    childrenMenus.value = children;
  };

  // 点击外部
  // Click outside
  const handleClickOutside = () => {
    setActive(true);
    closeMenu();
  };

  // 获取菜单事件
  // Get menu events
  const getMenuEvents = computed(() => {
    return !unref(getMixSideFixed)
      ? {
          onMouseleave: () => {
            setActive(true);
            closeMenu();
          },
        }
      : {};
  });

  watch(
    () => route.fullPath,
    () => {
      currentRoute.value = route;
      setActive(true);
      if (unref(getCloseMixSidebarOnChange)) {
        closeMenu();
      }
    },
    { immediate: true },
  );
</script>

<style lang="less" scoped></style>
