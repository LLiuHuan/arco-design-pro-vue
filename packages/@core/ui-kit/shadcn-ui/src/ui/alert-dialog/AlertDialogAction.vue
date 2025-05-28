<!--
 * @Description: dialog 关闭按钮
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 09:47:54
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AlertDialogActionProps } from 'reka-ui';

import { AlertDialogAction } from 'reka-ui';

const props = defineProps<AlertDialogActionProps>();
</script>

<template>
  <AlertDialogAction v-bind="props">
    <slot></slot>
  </AlertDialogAction>
</template>
