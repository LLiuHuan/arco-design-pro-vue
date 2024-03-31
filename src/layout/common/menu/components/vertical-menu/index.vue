<template>
  <AMenu
    :theme="theme"
    :collapsed="getCollapsed"
    :mode="mode"
    :accordion="getAccordion"
  >
    <AMenuItem>
      <ASubMenu key="0">
        <template #icon><icon-apps></icon-apps></template>
        <template #title>Navigation 1</template>
        <AMenuItem key="0_0">Menu 1</AMenuItem>
        <AMenuItem key="0_1">Menu 2</AMenuItem>
        <AMenuItem key="0_2">Menu 3</AMenuItem>
        <AMenuItem key="0_3">Menu 4</AMenuItem>
      </ASubMenu>
    </AMenuItem>
  </AMenu>
</template>

<script lang="ts" setup>
  import { ThemeEnum } from '@/enums';
  import { useMenuSetting } from '@/hooks/setting';
  import type { MenuMode } from '@arco-design/web-vue/es/menu/interface';

  interface Props {
    /**
     * The theme of the current parent component - [当前父组件的主题]
     */
    theme: ThemeEnum;
    /**
     * The mode of the menu - [菜单的模式]
     */
    mode: MenuMode;
    menus: Menu[];
  }

  const props = withDefaults(defineProps<Props>(), {
    theme: ThemeEnum.LIGHT,
    mode: 'vertical',
  });
  const { getCollapsed, getAccordion } = useMenuSetting();
</script>

<style lang="less" scoped></style>
