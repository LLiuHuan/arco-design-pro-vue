<template>
  <ADropdown :trigger="trigger" v-bind="$attrs">
    <span>
      <slot></slot>
    </span>
  </ADropdown>
</template>

<script lang="ts" setup>
  interface Props {
    /**
     * Trigger mode - [触发方式]
     */
    trigger?: 'hover' | 'click' | 'focus' | 'contextMenu';
  }

  const props = defineProps<Props>();
</script>

<style lang="less" scoped></style>
