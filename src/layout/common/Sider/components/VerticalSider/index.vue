<template>
  <a-layout-sider
    class="layout-sider"
    hide-trigger
    collapsible
    :collapsed="app.siderCollapse"
    :style="{ width: headerLeft + 'px' }"
  >
    <dark-mode-container class="flex-col-stretch h-full" :inverted="theme.sider.inverted">
      <Logo
        v-if="!isHorizontalMix"
        :show-title="showTitle"
        :png-logo="LogoPng"
        :style="{ height: theme.header.height + 'px' }"
      />
      <VerticalMenu />
    </dark-mode-container>
  </a-layout-sider>
</template>

<script lang="ts" setup>
  import { computed, ref } from 'vue';
  import { Message } from '@arco-design/web-vue';
  import { useAppStore, useThemeStore } from '@/store';
  import { useBasicLayout } from '@/composables';
  import { Logo } from '@/layout/common';
  import LogoPng from '@/assets/logo.png';
  import { VerticalMenu } from './components';

  const app = useAppStore();
  const theme = useThemeStore();

  const isHorizontalMix = computed(() => theme.layout.mode === 'horizontal-mix');
  const showTitle = computed(() => !app.siderCollapse && theme.layout.mode !== 'vertical-mix');

  const headerLeft = computed((): number => {
    const { siderWidth, siderCollapsedWidth } = useBasicLayout();
    return app.siderCollapse ? siderCollapsedWidth.value : siderWidth.value;
  });
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
