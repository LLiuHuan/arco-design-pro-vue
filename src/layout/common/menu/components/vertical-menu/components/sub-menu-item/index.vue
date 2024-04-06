<template>
  <MenuItem v-if="!menuHasChildren(item)" :item="item"></MenuItem>

  <ASubMenu v-if="menuHasChildren(item)" :key="`submenu-${item.routeName}`">
    <template v-if="item.icon" #icon>
      <component :is="item.icon"></component>
    </template>
    <template #title>
      {{ item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title }}
    </template>

    <template
      v-for="childrenItem in item.children || []"
      :key="childrenItem.routeName"
    >
      <MenuItem :item="childrenItem"></MenuItem>
    </template>
  </ASubMenu>
</template>

<script lang="ts" setup>
  import type { App } from '~/types/app';
  import MenuItem from '../menu-item/index.vue';

  interface Props {
    item: App.Menu;
  }

  defineProps<Props>();

  const menuHasChildren = (menuTreeItem: App.Menu): boolean => {
    return (
      !menuTreeItem.meta?.hideChildrenInMenu &&
      Reflect.has(menuTreeItem, 'children') &&
      !!menuTreeItem.children &&
      menuTreeItem.children.length > 0
    );
  };
</script>

<style lang="less" scoped></style>
