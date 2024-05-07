<template>
  <div>
    {{ name }}

    <!--    {{ routeStore.getSearchMenus }}-->
    <div>111</div>
    <!--    {{ routeStore.getMenus }}-->
  </div>
</template>

<script lang="ts" setup>
  import { useRouteStoreWithOut } from '@/store/modules/route';

  const name = 'workbench';

  const routeStore = useRouteStoreWithOut();
</script>

<style lang="less" scoped></style>
