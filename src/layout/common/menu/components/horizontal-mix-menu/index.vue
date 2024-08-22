<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';
  import { useMixMenuContext } from '@/layout/context';
  import FirstLevelMenu from '../first-level-menu/index.vue';

  const { goKey } = useGo();
  const { activeFirstLevelMenuKey, setActiveFirstLevelMenuKey } =
    useMixMenuContext();

  function handleSelectMixMenu(item: App.Menu) {
    setActiveFirstLevelMenuKey(item.key);
    if (!item.children?.length) {
      goKey(item.routeKey);
    }
  }
</script>

<template>
  <FirstLevelMenu
    :active-menu-key="activeFirstLevelMenuKey"
    @select="handleSelectMixMenu"
  >
    <slot></slot>
  </FirstLevelMenu>
</template>

<style lang="less" scoped></style>
