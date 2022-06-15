<template>
  <hover-container
    class="w-40px h-full collapse"
    :class="app.siderCollapse ? 'openCollapse' : 'closeCollapse'"
    :inverted="theme.header.inverted"
    @click="app.toggleSiderCollapse"
  >
    <icon-menu-unfold
      v-if="app.siderCollapse"
      class="text-16px"
      style="color: var(--color-text-1)"
    />
    <icon-menu-fold v-else class="text-16px" style="color: var(--color-text-1)" />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useAppStore, useThemeStore } from '@/store';

  const app = useAppStore();
  const theme = useThemeStore();
</script>
<style scoped>
  .collapse {
    transition: transform 0.3s ease;
  }

  .openCollapse {
    transform: rotate(180deg);
  }

  .closeCollapse {
    transform: rotate(0);
  }
</style>
