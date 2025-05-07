<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-22 13:17:40
 * @LastEditTime: 2024-10-17 09:26:43
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';
  import { useRouteStore } from '@/store/modules/route';
  import FirstLevelMenu from '../first-level-menu/index.vue';

  const { goKey } = useGo();
  const routeStore = useRouteStore();

  function handleSelectMixMenu(item: App.Menu) {
    routeStore.setActiveFirstLevelMenuKey(item.key);
    if (!item.children?.length) {
      goKey(item.routeKey);
    }
  }
</script>

<template>
  <FirstLevelMenu
    :active-menu-key="routeStore.activeFirstLevelMenuKey"
    @select="handleSelectMixMenu"
  >
    <slot></slot>
  </FirstLevelMenu>
</template>

<style lang="less" scoped></style>
