<template>
  <VerticalMenu />
</template>

<script lang="ts" setup>
  import { VerticalMenu } from '../../Sider/components/VerticalSider/components';
</script>

<style lang="less" scoped>
  :deep(.arco-menu-horizontal .arco-menu-inner) {
    overflow: hidden;
    padding: 9px 10px 8px 10px;
  }

  :deep(.arco-menu-selected-label) {
    bottom: -8px;
    height: 2px;
  }
</style>
