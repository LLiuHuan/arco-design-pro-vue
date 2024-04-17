<template>
  <div>
    <AScrollbar
      outer-class="h-full"
      class="h-full overflow-y-auto adp-default-layout-content"
    >
      <slot></slot>
    </AScrollbar>

    <ABackTop
      target-container=".adp-default-layout-content"
      :style="{ position: 'absolute' }"
    />
  </div>
</template>

<script lang="ts" setup>
  defineOptions({ name: 'BaseScrollbarContext' });
</script>

<style lang="less" scoped></style>
