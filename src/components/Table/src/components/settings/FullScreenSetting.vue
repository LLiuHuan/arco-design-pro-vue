<template>
  <ATooltip content="全屏" position="top">
    <div class="cursor-pointer" @click="toggle">
      <SvgIcon v-if="isFullscreen" icon="gridicons:fullscreen-exit" size="20" />
      <SvgIcon v-else icon="gridicons:fullscreen" size="20" />
    </div>
  </ATooltip>
</template>

<script lang="ts" setup>
  import { useFullscreen } from '@vueuse/core';
  import { SvgIcon } from '@/components/Icon';
  import { useTableContext } from '../../hooks/useTableContext';

  defineOptions({ name: 'FullScreenSetting' });

  const table = useTableContext();

  // 等wrapRef挂载完毕再调用useFullscreen
  const { isFullscreen, toggle } = useFullscreen(table.wrapRef);
</script>

<style lang="less" scoped></style>
