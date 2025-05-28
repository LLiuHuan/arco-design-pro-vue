<!--
 * @Description: 菜单单选组组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:03:07
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type {
  ContextMenuRadioGroupEmits,
  ContextMenuRadioGroupProps,
} from 'reka-ui';

import { ContextMenuRadioGroup, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<ContextMenuRadioGroupProps>();
const emits = defineEmits<ContextMenuRadioGroupEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <ContextMenuRadioGroup v-bind="forwarded">
    <slot></slot>
  </ContextMenuRadioGroup>
</template>
