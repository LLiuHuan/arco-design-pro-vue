<template>
  <hover-container
    tooltip-content="github"
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="handleClickLink"
  >
    <icon-github class="text-20px" style="color: var(--color-text-1)" />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();
  function handleClickLink() {
    window.open('https://github.com/LLiuHuan/arco-design-pro-vue', '_blank');
  }
</script>
<style scoped></style>
