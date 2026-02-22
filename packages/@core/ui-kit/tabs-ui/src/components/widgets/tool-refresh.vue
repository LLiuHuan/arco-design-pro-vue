<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2026-02-23 00:29:09
 * @LastEditTime: 2026-02-23 00:29:26
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { RotateCw } from '@qin-core/icons';

const emit = defineEmits(['refresh']);

const handleRefresh = () => {
  emit('refresh');
};
</script>

<template>
  <div
    class="flex-center border-border text-muted-foreground hover:bg-muted hover:text-foreground h-full cursor-pointer border-l px-2 text-lg font-semibold"
    @click="handleRefresh"
  >
    <RotateCw class="size-4" />
  </div>
</template>
