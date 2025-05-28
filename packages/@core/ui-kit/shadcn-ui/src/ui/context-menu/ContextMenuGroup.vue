<!--
 * @Description: 菜单分组组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:00:35
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuGroupProps } from 'reka-ui';

import { ContextMenuGroup } from 'reka-ui';

const props = defineProps<ContextMenuGroupProps>();
</script>

<template>
  <ContextMenuGroup v-bind="props">
    <slot></slot>
  </ContextMenuGroup>
</template>
