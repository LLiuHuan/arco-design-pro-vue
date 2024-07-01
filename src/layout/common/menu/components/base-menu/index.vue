<template>
  <div class="h-full flex-col-stretch flex-1-hidden">
    <DefineMenuItem v-slot="{ item }">
      <ASubMenu v-if="menuHasChildren(item)" :key="`${item.routeKey}_sub`">
        <template v-if="item.icon" #icon>
          <component :is="item.icon"></component>
        </template>
        <template #title>{{ item.label }}</template>
        <MenuItem
          v-for="childrenItem in item.children || []"
          :key="childrenItem.routeKey"
          :item="childrenItem"
        />
      </ASubMenu>
      <AMenuItem v-else :key="item.routeKey">
        <template v-if="item.icon" #icon>
          <component :is="item.icon" />
        </template>
        {{ item.label }}
      </AMenuItem>
    </DefineMenuItem>

    <AScrollbar
      class="h-full overflow-y-auto"
      outer-class="h-full flex-1-hidden"
    >
      <AMenu
        :accordion="getAccordion"
        :collapsed="collapsed"
        :collapsed-width="getCollapsedMenuWidth"
        :mode="mode"
        :open-keys="menuState.openKeys"
        :selected-keys="menuState.selectedKeys"
        :theme="theme"
        auto-open-selected
        auto-scroll-into-view
        class="transition-base vertical-mix-menu w-full box-border"
        @menu-item-click="handleMenuItemClick"
        @sub-menu-click="handleSubMenuItemClick"
      >
        <template v-for="item in menus" :key="item.routeName">
          <MenuItem :item="item" />
        </template>
      </AMenu>
    </AScrollbar>

    <LayoutTrigger
      v-if="isTrigger && getTrigger === 'FOOTER'"
      :style="{ height: `${getFooterHeight + 1}px` }"
      class="cursor-pointer bg-[var(--color-bg-2)] border-t-1 border-t-solid border-t-[var(--color-fill-2)]"
    />
  </div>
</template>

<script lang="ts" setup>
  import { AppEnum, MenuModeEnum } from '@/enums';
  import { useFooterSetting, useMenuSetting } from '@/hooks/setting';
  import { listenerRouteChange } from '@/utils/router';
  import { computed, reactive, ref, unref } from 'vue';
  import { useGo } from '@/hooks/web/usePage';
  import { isBoolean } from '@/utils/common';
  import { LayoutTrigger } from '@/layout/common';
  import { createReusableTemplate } from '@vueuse/core';
  import { useRouteStore } from '@/store/modules/route';
  import { MenuItemProps, MenuState, Props } from './types';

  const props = withDefaults(defineProps<Props>(), {
    theme: AppEnum.LIGHT,
    mode: MenuModeEnum.VERTICAL,
  });

  const menuState = reactive<MenuState>({
    selectedKeys: [],
    openKeys: [],
  });

  const [DefineMenuItem, MenuItem] = createReusableTemplate<MenuItemProps>();

  const routeStore = useRouteStore();

  const {
    getCollapsed,
    getAccordion,
    getCollapsedMenuWidth,
    isTrigger,
    getTrigger,
  } = useMenuSetting();
  const { getFooterHeight } = useFooterSetting();

  // 判断一下是否点击了菜单
  const isClickGo = ref(false);

  const { goKey } = useGo();

  // 获取菜单折叠状态
  // Get the menu collapse status
  const collapsed = computed(() => {
    if (isBoolean(props.collapsed)) {
      return props.collapsed;
    }
    return unref(getCollapsed);
  });

  // 点击菜单
  // Click menu
  const handleMenuClick = (key: AuthRoute.AllRouteKey) => {
    const routeSplitMark = '_';
    const params: Record<string, string> = {};
    key
      .split(routeSplitMark)
      .filter((v: string) => v.startsWith(':'))
      .forEach((v: string) => {
        params[v.replaceAll(':', '')] = v;
      });
    goKey(key, { params });
  };

  const handleMenuItemClick = (key: AuthRoute.AllRouteKey) => {
    handleMenuClick(key);
    isClickGo.value = true;
    menuState.selectedKeys = [key];
  };

  const handleSubMenuItemClick = (_: string, openKeys: string[]) => {
    menuState.openKeys = openKeys;
  };

  // 是否有子菜单
  // Whether there are submenus
  const menuHasChildren = (menuTreeItem: App.Menu): boolean => {
    // !menuTreeItem.meta?.hideChildrenInMenu &&
    return (
      Reflect.has(menuTreeItem, 'children') &&
      !!menuTreeItem.children &&
      menuTreeItem.children.length > 0
    );
  };

  // 监听路由变化
  // Listen for route changes
  listenerRouteChange((route) => {
    const { hideInMenu, activeMenu } = route.meta;
    const name = route.name as string;
    const activeKey = (hideInMenu ? activeMenu : name) || name;
    menuState.selectedKeys = [activeKey];
    const openKeys = routeStore.getSelectedMenuKeyPath(activeKey);
    if (menuState.selectedKeys.length > 0 && openKeys.length > 1) {
      menuState.openKeys = openKeys.map((key) => `${key}_sub`);
    }
  }, true);
</script>

<style lang="less" scoped></style>
