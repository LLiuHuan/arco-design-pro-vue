<template>
  <a-divider orientation="center">{{ $t('settings.navbar.theme') }}</a-divider>
  <a-space direction="vertical" fill>
    <setting-menu :label="$t('settings.navbar.theme.dark')">
      <a-switch :model-value="theme.darkMode" @change="theme.setDarkMode" />
    </setting-menu>
  </a-space>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';
  import SettingMenu from '../SettingMenu/index.vue';

  const theme = useThemeStore();
</script>

<style lang="less" scoped></style>
