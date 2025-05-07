<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 16:56:39
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { useFullscreen } from '@vueuse/core';
  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';

  const { isFullscreen, toggle } = useFullscreen();

  const { t } = useI18n();
</script>

<template>
  <HoverContainer
    :tooltip-content="
      isFullscreen
        ? t('layout.header.tooltipExitFull')
        : t('layout.header.tooltipEntryFull')
    "
    @click="toggle"
  >
    <AButton type="text" class="!text-[var(--color-text-1)] !h-40px">
      <SvgIcon v-if="isFullscreen" icon="gridicons:fullscreen-exit" size="18" />
      <SvgIcon v-else icon="gridicons:fullscreen" size="18" />
    </AButton>
  </HoverContainer>
</template>

<style lang="less" scoped></style>
