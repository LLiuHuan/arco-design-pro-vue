<template>
  <ADivider>{{ $t('layout.setting.layoutMode.title') }}</ADivider>

  <LayoutModeCard :event="HandlerEnum.LAYOUT_MODE" :def="menuMode">
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
  import { useMenuSetting } from '@/hooks/setting';
  import { computed, unref } from 'vue';
  import { HandlerEnum, InputNumberItem, LayoutModeCard } from '../common';

  const { getMenuMode, setMenuSetting } = useMenuSetting();

  const menuMode = computed({
    get: () => unref(getMenuMode),
    set: (mode) => {
      console.log('menuMode', mode);
      setMenuSetting({ mode: unref(mode) });
    },
  });
</script>

<style scoped>
  .layout-header {
    --uno: h-16px bg-[rgba(var(--primary-5))] rd-4px;
  }

  .layout-sider {
    --uno: bg-[rgba(var(--primary-4))] rd-4px;
  }

  .layout-main {
    --uno: flex-1 bg-[rgba(var(--primary-3))] rd-4px;
  }

  .vertical-wrapper {
    --uno: flex-1 flex-col gap-6px;
  }

  .horizontal-wrapper {
    --uno: flex-1 flex gap-6px;
  }
</style>
