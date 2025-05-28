<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:23:35
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { Maximize, Minimize } from '@arco-core/icons';

import { useFullscreen } from '@vueuse/core';

import { ArcoIconButton } from '../button';

defineOptions({ name: 'FullScreen' });

const { isFullscreen, toggle } = useFullscreen();

// 重新检查全屏状态
isFullscreen.value = !!(
  document.fullscreenElement ||
  // @ts-ignore
  document.webkitFullscreenElement ||
  // @ts-ignore
  document.mozFullScreenElement ||
  // @ts-ignore
  document.msFullscreenElement
);
</script>
<template>
  <ArcoIconButton @click="toggle">
    <Minimize v-if="isFullscreen" class="text-foreground size-4" />
    <Maximize v-else class="text-foreground size-4" />
  </ArcoIconButton>
</template>
