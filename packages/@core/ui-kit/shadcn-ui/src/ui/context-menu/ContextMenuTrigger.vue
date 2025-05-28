<!--
 * @Description: 菜单触发组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:06:18
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuTriggerProps } from 'reka-ui';

import { ContextMenuTrigger, useForwardProps } from 'reka-ui';

const props = defineProps<ContextMenuTriggerProps>();

const forwardedProps = useForwardProps(props);
</script>

<template>
  <ContextMenuTrigger v-bind="forwardedProps">
    <slot></slot>
  </ContextMenuTrigger>
</template>
