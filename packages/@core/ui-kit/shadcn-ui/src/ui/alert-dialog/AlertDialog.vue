<!--
 * @Description: dialog 组件
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:48:00
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AlertDialogEmits, AlertDialogProps } from 'reka-ui';

import { AlertDialogRoot, useForwardPropsEmits } from 'reka-ui';

const props = defineProps<AlertDialogProps>();
const emits = defineEmits<AlertDialogEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <AlertDialogRoot v-bind="forwarded">
    <slot></slot>
  </AlertDialogRoot>
</template>
