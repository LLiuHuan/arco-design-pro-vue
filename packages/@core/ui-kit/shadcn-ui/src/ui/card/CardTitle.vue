<!--
 * @Description: 卡片标题组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:58:46
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@arco-core/shared/utils';

const props = defineProps<{
  class?: any;
}>();
</script>

<template>
  <h3 :class="cn('leading-none font-semibold tracking-tight', props.class)">
    <slot></slot>
  </h3>
</template>
