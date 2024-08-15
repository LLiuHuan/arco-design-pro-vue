<template>
  <ADivider>{{ $t('layout.setting.layoutMode.title') }}</ADivider>

  <LayoutModeCard
    :def="menuMode"
    :disabled="getIsMobile"
    :event="HandlerEnum.LAYOUT_MODE"
  >
    <template #vertical>
      <div class="layout-sider h-full w-18px"></div>
      <div class="vertical-wrapper">
        <div class="layout-header"></div>
        <div class="layout-main"></div>
      </div>
    </template>
    <template #vertical-mix>
      <div class="layout-sider h-full w-8px"></div>
      <div class="layout-sider h-full w-16px"></div>
      <div class="vertical-wrapper">
        <div class="layout-header"></div>
        <div class="layout-main"></div>
      </div>
    </template>
    <template #horizontal>
      <div class="layout-header"></div>
      <div class="horizontal-wrapper">
        <div class="layout-main"></div>
      </div>
    </template>
    <template #horizontal-mix>
      <div class="layout-header"></div>
      <div class="horizontal-wrapper">
        <div class="layout-sider w-18px"></div>
        <div class="layout-main"></div>
      </div>
    </template>
  </LayoutModeCard>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useLayoutSetting, useRootSetting } from '@/hooks/setting';
  import { HandlerEnum, LayoutModeCard } from '../common';

  const { getLayoutMode, setLayoutSetting } = useLayoutSetting();
  const { getIsMobile } = useRootSetting();

  const menuMode = computed({
    get: () => unref(getLayoutMode),
    set: (mode) => {
      setLayoutSetting({ mode: unref(mode) });
    },
  });
</script>

<style scoped>
  .layout-header {
    --uno: h-16px 'bg-[rgba(var(--primary-5))]' rd-4px;
  }

  .layout-sider {
    --uno: 'bg-[rgba(var(--primary-4))]' rd-4px;
  }

  .layout-main {
    --uno: flex-1 'bg-[rgba(var(--primary-3))]' rd-4px;
  }

  .vertical-wrapper {
    --uno: flex-1 flex-col gap-6px;
  }

  .horizontal-wrapper {
    --uno: flex-1 flex gap-6px;
  }
</style>
