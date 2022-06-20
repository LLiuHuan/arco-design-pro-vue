<template>
  <hover-container
    tooltip-content="设置"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="openSetting"
  >
    <icon-settings class="text-20px" style="color: var(--color-text-1)" />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useAppStore, useThemeStore } from '@/store';

  const theme = useThemeStore();
  const app = useAppStore();

  const openSetting = () => {
    app.openSettingDrawer();
  };
</script>

<style lang="less" scoped></style>
