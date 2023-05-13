<template>
  <hover-container
    class="w-40px"
    :inverted="theme.header.inverted"
    :tooltip-content="$t('settings.navbar.theme')"
  >
    <dark-mode-switch
      class="wh-full"
      @update:dark="theme.setDarkMode"
      style="color: var(--color-text-1)"
    />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();
</script>
<style scoped></style>
