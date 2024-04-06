<template>
  <AMenu
    :theme="theme"
    :collapsed="getCollapsed"
    :mode="mode"
    :accordion="getAccordion"
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
  import { SubMenuItem } from './components';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme?: AppEnum;
    /**
     * The mode of the menu - [菜单的模式]
     */
    mode?: MenuMode;
    menus: App.Menu[];
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: AppEnum.LIGHT,
    mode: 'vertical',
  });
  const { getCollapsed, getAccordion } = useMenuSetting();
</script>

<style lang="less" scoped></style>
