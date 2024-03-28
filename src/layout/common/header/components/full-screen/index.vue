<template>
  <HoverContainer
    :tooltip-content="
      isFullscreen
        ? $t('layout.header.tooltipExitFull')
        : $t('layout.header.tooltipEntryFull')
    "
    @click="toggle"
  >
    <AButton type="text" class="!text-[var(--color-text-1)]">
      <SvgIcon v-if="isFullscreen" icon="gridicons:fullscreen-exit" size="20">
      </SvgIcon>
      <SvgIcon v-else icon="gridicons:fullscreen" size="20"> </SvgIcon>
    </AButton>
  </HoverContainer>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { useFullscreen } from '@vueuse/core';
  import { SvgIcon } from '@/components/Icon';

  const { isFullscreen, toggle } = useFullscreen();
</script>

<style lang="less" scoped></style>
