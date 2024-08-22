<script lang="ts" setup>
  import { useRouteStore } from '@/store/modules/route';
  import { computed, ref, unref } from 'vue';
  import {
    useGlobSetting,
    useHeaderSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { RouteLocationNormalized } from 'vue-router';
  import { useGo } from '@/hooks/web/usePage';
  import { SvgIcon } from '@/components/Icon';
  import { onClickOutside } from '@vueuse/core';
  import { listenerRouteChange } from '@/utils/router';
  import LayoutMenu from '../base-menu/index.vue';
  import FirstLevelMenu from '../first-level-menu/index.vue';

  const { menus: routeMenus, getSelectedMenuKeyPath } = useRouteStore();
  const {
    getMixSideFixed,
    isVerticalMix,
    getCloseMixSidebarOnChange,
    getMixChildMenuWidth,
    setMenuSetting,
    getIsMenuDark,
  } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
  const { getIsDarkMode } = useRootSetting();
  const { VITE_GLOB_APP_TITLE } = useGlobSetting();

  const mixMenuRef = ref(null);

  const activeName = ref(''); // 当前活动菜单
  const openMenu = ref(false); // 是否打开子菜单
  const childrenMenus = ref<App.Menu[]>([]); // 子菜单
  const currentRoute = ref<RouteLocationNormalized | null>(null); // 当前路由
  const siderDark = computed(
    () => !unref(getIsDarkMode) && unref(getIsMenuDark),
  );

  // 是否显示子菜单
  // Whether to show the drawer
  const showDrawer = computed(
    () =>
      (unref(openMenu) && unref(childrenMenus).length > 0) ||
      unref(getMixSideFixed),
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
    const activeKey = (unref(currentRoute)?.meta?.activeMenu ||
      unref(currentRoute)?.name) as string;
    const activeKeys = getSelectedMenuKeyPath(activeKey);
    if (!activeKeys) return;
    activeName.value = activeKeys ? activeKeys[0] : '';
    if (unref(isVerticalMix)) {
      const activeMenu = unref(routeMenus).find(
        (item) => item.routeKey === unref(activeName),
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
    const { routeKey, children } = item;
    if (unref(activeName) === routeKey) {
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
      activeName.value = routeKey;
    }

    if (!children || children.length === 0) {
      if (!hover) goKey(routeKey);
      childrenMenus.value = [];
      closeMenu();
      return;
    }

    childrenMenus.value = children;
  };

  // 点击外部
  // Click outside
  onClickOutside(mixMenuRef, () => {
    setActive(true);
    closeMenu();
  });

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

  listenerRouteChange((route) => {
    currentRoute.value = route;
    setActive(true);
    if (unref(getCloseMixSidebarOnChange)) {
      closeMenu();
    }
  });
</script>

<template>
  <div ref="mixMenuRef" class="h-full flex" v-bind="getMenuEvents">
    <FirstLevelMenu
      :active-menu-key="activeName"
      :dark="siderDark"
      @select="handleSelectMixMenu"
    >
      <slot></slot>
    </FirstLevelMenu>
    <div
      :style="{ width: getMixSideFixed ? `${getMixChildMenuWidth}px` : '0px' }"
      class="relative h-full transition-base"
    >
      <div
        :class="{
          'bg-[var(--color-menu-dark-bg)]': siderDark,
        }"
        :style="{
          width: showDrawer ? `${getMixChildMenuWidth}px` : '0px',
        }"
        class="absolute-lt h-full flex-col-stretch nowrap-hidden shadow-sm transition-base bg-[var(--color-bg-2)]"
      >
        <header
          :style="{ height: `${getHeaderHeight}px` }"
          class="flex-y-center justify-between"
        >
          <h2 class="pl-8px text-16px text-[rgba(var(--primary-6))] font-bold">
            {{ VITE_GLOB_APP_TITLE }}
          </h2>
          <div
            :class="{
              '!text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]':
                !siderDark,
              '!text-white:88 hover:!text-white': siderDark,
            }"
            class="cursor-pointer pr-10px"
            @click="handleFixedMenu"
          >
            <SvgIcon
              v-if="getMixSideFixed"
              class="cursor-pointer"
              icon="ri:pushpin-2-fill"
            />
            <SvgIcon v-else class="cursor-pointer" icon="ri:pushpin-2-line" />
          </div>
        </header>

        <LayoutMenu
          :collapsed="false"
          :dark="siderDark"
          :menus="childrenMenus"
          class="flex-1"
        />
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
