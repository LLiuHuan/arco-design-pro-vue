<template>
  <dark-mode-container class="flex-col-stretch h-full" :inverted="theme.sider.inverted">
    <Logo
      v-if="!isHorizontalMix"
      :show-title="showTitle"
      :png-logo="LogoPng"
      :style="{ height: theme.header.height + 'px' }"
    />
    <Menu :menus="routeStore.menus" :mode="'vertical'" />
  </dark-mode-container>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useAppStore, useRouteStore, useThemeStore } from '@/store';
  import { Logo, Menu } from '@/layout/common';
  import LogoPng from '@/assets/logo.png';

  const app = useAppStore();
  const theme = useThemeStore();
  const routeStore = useRouteStore();

  const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
  const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');
</script>

<style lang="less" scoped>
  .logo {
    height: 32px;
    margin: 12px 8px;
    //background: rgba(255, 255, 255, 0.2);
    //background-color: var(--color-bg-2);
  }

  .layout-sider {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99;
    height: 100%;
    transition: all 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }
</style>
