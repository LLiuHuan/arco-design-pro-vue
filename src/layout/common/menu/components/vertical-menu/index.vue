<template>
  {{ menuState.selectedKeys }}
  {{ menuState.openKeys }}
  <AMenu
    :selected-keys="menuState.selectedKeys"
    :open-keys="menuState.openKeys"
    :theme="theme"
    :collapsed="getCollapsed"
    :mode="mode"
    :accordion="getAccordion"
    auto-open-selected
    @menu-item-click="handleMenuItemClick"
    @sub-menu-click="handleSubMenuItemClick"
  >
    <template v-for="item in menus" :key="item.routeName">
      <SubMenuItem :item="item"> </SubMenuItem>
    </template>
  </AMenu>
</template>

<script lang="ts" setup>
  import { AppEnum } from '@/enums';
  import { useMenuSetting } from '@/hooks/setting';
  import type { MenuMode } from '@arco-design/web-vue/es/menu/interface';
  import type { App } from '~/types/app';
  import { listenerRouteChange } from '@/utils/router';
  import { reactive, ref, unref } from 'vue';
  import { RouteLocationNormalizedLoaded, useRouter } from 'vue-router';
  import { isFunction } from '@/utils/common';
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

    /**
     * The callback function before clicking the menu - [点击菜单前的回调函数]
     */
    beforeClickFn?: (key: string | number) => Promise<boolean>;
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
  const currentActiveMenu = ref('');

  const { currentRoute } = useRouter();

  const { getCollapsed, getAccordion } = useMenuSetting();

  const handleMenuItemClick = (key: string) => {
    const { beforeClickFn } = props;
    if (beforeClickFn && isFunction(beforeClickFn)) {
      const flag = beforeClickFn(key);
      if (!flag) return;
    }

    emit('menuClick', key);

    isClickGo.value = true;
    menuState.selectedKeys = [key];
  };

  const handleSubMenuItemClick = (key: string, openKeys: string[]) => {
    console.log('sub menu item click', key, openKeys);
    menuState.openKeys = openKeys;
  };

  const handleMenuChange = async (route?: RouteLocationNormalizedLoaded) => {
    if (unref(isClickGo)) {
      isClickGo.value = false;
      return;
    }

    const path =
      (route || unref(currentRoute)).meta?.currentActiveMenu ||
      (route || unref(currentRoute)).path;

    console.log(path);
  };

  listenerRouteChange((route) => {
    if (route.name === '/redirect') {
      return;
    }
    handleMenuChange(route);

    currentActiveMenu.value = route.meta?.currentActiveMenu as string;
    console.log('route change', route);

    if (unref(currentActiveMenu)) {
      menuState.selectedKeys = [unref(currentActiveMenu)];
      // setOpenKeys(unref(currentActiveMenu));
    }
  });
</script>

<style lang="less" scoped></style>
