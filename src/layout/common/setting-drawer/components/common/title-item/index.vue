<script lang="ts" setup>
  interface Props {
    /**
     * @description Name
     */
    title?: string;
  }

  defineOptions({
    name: 'TitleItem',
  });

  defineProps<Props>();
</script>

<template>
  <h2 class="mb-3 font-semibold leading-none tracking-tight">
    <slot>{{ title }}</slot>
  </h2>
</template>

<style lang="less" scoped></style>
