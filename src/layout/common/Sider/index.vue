<template>
  <VerticalMixSider v-if="isVerticalMix" />
  <VerticalSider v-else />
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useThemeStore } from '@/store';
  import { VerticalMixSider, VerticalSider } from './components';

  const theme = useThemeStore();

  const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix');
</script>

<style lang="less" scoped>
  .arco-layout-sider {
    z-index: 1002;
    //background-color: var(--color-bg-2);
  }
</style>
