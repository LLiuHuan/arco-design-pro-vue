<template>
  <a-layout-sider
    class="layout-sider"
    hide-trigger
    collapsible
    :collapsed="!isVerticalMix ? app.siderCollapse : false"
    :style="{ width: headerLeft + 'px' }"
    v-if="siderVisible"
  >
    <VerticalMixSider v-if="isVerticalMix" />
    <VerticalSider v-else />
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore, useThemeStore } from '@/store';
  import { useBasicLayout } from '@/composables';
  import { VerticalMixSider, VerticalSider } from './components';

  const theme = useThemeStore();
  const app = useAppStore();
  const { mode, headerProps, siderVisible, siderWidth, siderCollapsedWidth } = useBasicLayout();

  const isVerticalMix = computed(() => theme.layout.mode === 'vertical-mix');

  const headerLeft = computed((): number => {
    return app.siderCollapse ? siderCollapsedWidth.value : siderWidth.value;
  });
</script>

<style lang="less" scoped>
  .arco-layout-sider {
    z-index: 1002;
    //background-color: var(--color-bg-2);
  }

  :deep(.arco-layout-sider-children) {
    overflow: visible;
  }
</style>
