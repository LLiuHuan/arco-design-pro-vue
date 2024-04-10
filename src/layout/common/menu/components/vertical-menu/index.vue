<template>
  <AMenu
    :selected-keys="menuState.selectedKeys"
    :open-keys="menuState.openKeys"
    :theme="theme"
    :collapsed="getCollapsed"
    :mode="mode"
    :accordion="getAccordion"
    auto-open-selected
    auto-scroll-into-view
    @menu-item-click="handleMenuItemClick"
    @sub-menu-click="handleSubMenuItemClick"
  >
    <template v-for="item in menus" :key="item.routeName">
      <SubMenuItem :item="item"> </SubMenuItem>
    </template>
  </AMenu>
</template>

<script lang="ts" setup>
  import { AppEnum, PageEnum } from '@/enums';
  import { useMenuSetting } from '@/hooks/setting';
  import type { MenuMode } from '@arco-design/web-vue/es/menu/interface';
  import type { App } from '~/types/app';
  import {
    getActiveKeyPathsOfMenus,
    listenerRouteChange,
  } from '@/utils/router';
  import { reactive, ref, unref } from 'vue';
  import { SubMenuItem } from './components';
  import { MenuState } from './types';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
    /**
     * The mode of the menu - [菜单的模式]
     */
    mode?: MenuMode;
    /**
     * Menu data -[菜单数据]
     */
    menus: App.Menu[];
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: AppEnum.LIGHT,
    mode: 'vertical',
  });

  const emit = defineEmits(['menuClick']);

  const menuState = reactive<MenuState>({
    selectedKeys: [],
    defaultSelectedKeys: [],
    openKeys: [],
  });

  // 判断一下是否点击了菜单
  const isClickGo = ref(false);

  const { getCollapsed, getAccordion } = useMenuSetting();

  const handleMenuItemClick = (key: string) => {
    emit('menuClick', key);
    isClickGo.value = true;
    menuState.selectedKeys = [key];
  };

  const handleSubMenuItemClick = (_: string, openKeys: string[]) => {
    menuState.openKeys = openKeys;
  };

  listenerRouteChange((route) => {
    if (route.name === PageEnum.REDIRECT) {
      return;
    }

    console.log('listenerRouteChange', route, unref(isClickGo));

    if (unref(isClickGo)) {
      isClickGo.value = false;
      return;
    }
    const activeKey = (route.meta?.currentActiveMenu || route.name) as string;

    menuState.selectedKeys = getActiveKeyPathsOfMenus(activeKey, props.menus);
    menuState.openKeys = menuState.selectedKeys.slice(
      menuState.selectedKeys.length - 1,
    );
  });
</script>

<style lang="less" scoped></style>
