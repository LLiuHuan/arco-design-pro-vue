<template>
  <hover-container
    :tooltip-content="
      isFullscreen ? $t('settings.navbar.screen.toExit') : $t('settings.navbar.screen.toFull')
    "
    class="w-40px h-full"
    :inverted="theme.header.inverted"
    @click="toggleFullScreen"
  >
    <icon-fullscreen v-if="!isFullscreen" class="text-20px" style="color: var(--color-text-1)" />
    <icon-fullscreen-exit v-else class="text-20px" style="color: var(--color-text-1)" />
  </hover-container>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import { useThemeStore } from '@/store';

  const theme = useThemeStore();
  const { isFullscreen, toggle: toggleFullScreen } = useFullscreen();

  defineExpose({ isFullscreen, toggleFullScreen });
</script>

<style lang="less" scoped></style>
