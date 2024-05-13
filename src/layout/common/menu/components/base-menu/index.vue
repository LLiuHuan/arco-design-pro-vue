<template>
  <div class="h-full flex-col-stretch flex-1-hidden">
    <AScrollbar
      outer-class="h-full flex-1-hidden"
      class="h-full overflow-y-auto"
    >
      <AMenu
        class="transition-base vertical-mix-menu"
        :selected-keys="menuState.selectedKeys"
        :open-keys="menuState.openKeys"
        :theme="theme"
        :mode="mode"
        :collapsed="collapsed"
        :collapsed-width="getCollapsedMenuWidth"
        :accordion="getAccordion"
        auto-open-selected
        auto-scroll-into-view
        @menu-item-click="handleMenuItemClick"
        @sub-menu-click="handleSubMenuItemClick"
      >
        <SubMenuItem v-for="item in menus" :key="item.routeName" :item="item" />
      </AMenu>
    </AScrollbar>

    <LayoutTrigger
      v-if="isTrigger && getTrigger === 'FOOTER'"
      class="cursor-pointer bg-[var(--color-bg-2)] border-t-1 border-t-solid border-t-[var(--color-fill-2)]"
      :style="{ height: `${getFooterHeight + 1}px` }"
    />
  </div>
</template>

<script lang="ts" setup>
  import { AppEnum, MenuModeEnum, PageEnum } from '@/enums';
  import { useFooterSetting, useMenuSetting } from '@/hooks/setting';
  import type { MenuMode } from '@arco-design/web-vue/es/menu/interface';
  import type { App } from '~/types/app';
  import { getActiveKeyPathsOfMenus, routeName } from '@/utils/router';
  import { computed, reactive, ref, unref, watch } from 'vue';
  import { useGo } from '@/hooks/web/usePage';
  import { isBoolean } from '@/utils/common';
  import { useRoute } from 'vue-router';
  import { LayoutTrigger } from '@/layout/common';
  import { SubMenuItem } from './components';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: 'light' | 'dark';
    /**
     * The mode of the menu - [菜单的模式]
     */
    mode?: MenuMode;
    /**
     * Menu data -[菜单数据]
     */
    menus: App.Menu[];

    /**
     * Whether the menu is collapsed - [菜单是否收起]
     */
    collapsed?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: AppEnum.LIGHT,
    mode: MenuModeEnum.VERTICAL,
  });

  interface MenuState {
    selectedKeys: string[];
    defaultSelectedKeys: string[];
    openKeys: string[];
  }

  const menuState = reactive<MenuState>({
    selectedKeys: [],
    defaultSelectedKeys: [],
    openKeys: [],
  });

  const route = useRoute();

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

  const collapsed = computed(() => {
    if (isBoolean(props.collapsed)) {
      return props.collapsed;
    }
    return unref(getCollapsed);
  });

  const handleMenuClick = (key: any) => {
    const routeSplitMark = '_';
    const params: Record<string, string> = {};
    key
      .split(routeSplitMark)
      .filter((v: string) => v.startsWith(':'))
      .forEach((v: string) => {
        params[v.replaceAll(':', '')] = v;
      });
    goKey(routeName(key), { params });
  };

  const handleMenuItemClick = (key: string) => {
    handleMenuClick(key);
    isClickGo.value = true;
    menuState.selectedKeys = [key];
  };

  const handleSubMenuItemClick = (_: string, openKeys: string[]) => {
    menuState.openKeys = openKeys;
  };

  watch(
    () => route.name,
    () => {
      if (route.name === PageEnum.REDIRECT) {
        return;
      }
      if (unref(isClickGo)) {
        isClickGo.value = false;
        return;
      }
      const activeKey = (route.meta?.currentActiveMenu || route.name) as string;
      const activeKeys = getActiveKeyPathsOfMenus(activeKey, props.menus);
      menuState.selectedKeys = activeKeys.slice(-1);
      menuState.openKeys = activeKeys.slice(0, -1).map((key) => `${key}_sub`);
    },
    { immediate: true },
  );
</script>

<style lang="less" scoped></style>
