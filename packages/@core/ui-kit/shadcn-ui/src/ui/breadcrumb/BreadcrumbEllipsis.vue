<!--
 * @Description: 面包屑省略组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:52:58
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { cn } from '@arco-core/shared/utils';

import { MoreHorizontal } from 'lucide-vue-next';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <span
    :class="cn('flex h-9 w-9 items-center justify-center', props.class)"
    aria-hidden="true"
    role="presentation"
  >
    <slot>
      <MoreHorizontal class="h-4 w-4" />
    </slot>
    <span class="sr-only">More</span>
  </span>
</template>
