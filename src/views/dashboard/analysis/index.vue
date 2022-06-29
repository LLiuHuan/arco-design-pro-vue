<template>
  <div class="container-view">
    <h1>1111111111</h1>

    <a-button @click="theme.setTabVisible(!theme.tab.visible)">a</a-button>
    <a-button @click="theme.setIsFixedHeaderAndTab(!theme.fixedHeaderAndTab)">b</a-button>
    <a-button @click="text">c</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { useRouter } from 'vue-router';
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();
  const router = useRouter();

  const text = () => {
    router.push('/dashboard/analysis/table');
  };
</script>

<style lang="less" scoped></style>
