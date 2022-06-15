<template>
  <div class="main-body container">
    <h1>1111111111</h1>

    <a-button @click="theme.setTabVisible(!theme.tab.visible)">a</a-button>
    <a-button @click="theme.setIsFixedHeaderAndTab(!theme.fixedHeaderAndTab)">b</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();
</script>

<style lang="less" scoped></style>
