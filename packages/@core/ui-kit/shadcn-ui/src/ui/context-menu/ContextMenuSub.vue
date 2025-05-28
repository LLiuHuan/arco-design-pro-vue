<!--
 * @Description: 菜单子项组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:04:58
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ContextMenuSubEmits, ContextMenuSubProps } from 'reka-ui';

import { ContextMenuSub, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ContextMenuSubProps>();
const emits = defineEmits<ContextMenuSubEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuSub v-bind="forwarded">
    <slot></slot>
  </ContextMenuSub>
</template>
