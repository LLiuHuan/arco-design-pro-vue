<!--
 * @Description: dialog 关闭按钮
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:52:22
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AlertDialogCancelProps } from 'reka-ui';

import { AlertDialogCancel } from 'reka-ui';

const props = defineProps<AlertDialogCancelProps>();
</script>

<template>
  <AlertDialogCancel v-bind="props">
    <slot></slot>
  </AlertDialogCancel>
</template>
