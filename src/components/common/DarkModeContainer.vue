<template>
  <!-- <div class="dark-mode-container transition-all duration-300 ease-in-out"  :class="props.inverted ? 'bg-[#001428]' : 'text-[#333639]'">  -->
  <div class="dark-mode-container">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
  interface Props {
    inverted?: boolean; // 反转色调
  }
  withDefaults(defineProps<Props>(), {
    inverted: false,
  });
</script>
<style scoped>
  .dark-mode-container {
    background-color: var(--color-bg-2);
  }
</style>
