<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:12:11
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@arco-core/shared/utils';

const props = defineProps<{ class?: any }>();
</script>

<template>
  <div
    :class="
      cn('flex flex-col-reverse flex-row justify-end gap-x-2', props.class)
    "
  >
    <slot></slot>
  </div>
</template>
