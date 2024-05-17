<template>
  <div>
    <AScrollbar
      outer-class="h-full"
      class="h-full overflow-y-auto adp-default-layout-content"
    >
      <slot></slot>
    </AScrollbar>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'BaseScrollbarContext' });
</script>

<style lang="less" scoped></style>
