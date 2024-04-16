<template>
  <div
    class="drag-bar absolute top-0 right-[-2px] z-200 w-2px h-full cursor-col-resize"
    :style="[
      !getCanDrag ? { display: 'none' } : {},
      getCollapsed ? { left: `${getMiniWidthNumber}px` } : {},
    ]"
    style="border-top: none; border-bottom: none"
  ></div>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting';

  defineOptions({ name: 'LayoutDragBar' });

  const { getCollapsed, getMiniWidthNumber, getCanDrag } = useMenuSetting();
</script>

<style lang="less" scoped>
  .drag-bar:hover {
    background-color: rgb(var(--primary-5));
    box-shadow: 0 0 4px 0 rgb(28 36 56 / 15%);
  }
</style>
