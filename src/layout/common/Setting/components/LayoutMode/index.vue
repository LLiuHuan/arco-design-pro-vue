<template>
  <a-divider orientation="center">{{ $t('settings.navbar.layout') }}</a-divider>
  <a-space fill>
    <layout-checkbox
      v-for="item in theme.layout.modeList"
      :key="item.value"
      :mode="item.value"
      :label="item.label"
      :checked="item.value === theme.layout.mode"
      @click="theme.setLayoutMode(item.value)"
    />
  </a-space>
</template>

<script setup lang="ts">
  import { useThemeStore } from '@/store';
  import { LayoutCheckbox } from './components';

  const theme = useThemeStore();
</script>
<style scoped></style>
