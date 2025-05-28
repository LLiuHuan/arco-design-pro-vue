<!--
 * @Description: 菜单容器
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:02:36
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuPortalProps } from 'reka-ui';

import { ContextMenuPortal } from 'reka-ui';

const props = defineProps<ContextMenuPortalProps>();
</script>

<template>
  <ContextMenuPortal v-bind="props">
    <slot></slot>
  </ContextMenuPortal>
</template>
