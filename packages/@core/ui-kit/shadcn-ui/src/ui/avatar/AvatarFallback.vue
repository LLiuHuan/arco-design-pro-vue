<!--
 * @Description: 文本头像组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:51:24
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AvatarFallbackProps } from 'reka-ui';

import { AvatarFallback } from 'reka-ui';

const props = defineProps<AvatarFallbackProps>();
</script>

<template>
  <AvatarFallback v-bind="props">
    <slot></slot>
  </AvatarFallback>
</template>
