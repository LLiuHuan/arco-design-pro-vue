<!--
 * @Description: dialog 标题
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-24 16:24:31
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { AlertDialogTitleProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { AlertDialogTitle, useForwardProps } from 'reka-ui';

const props = defineProps<AlertDialogTitleProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <AlertDialogTitle
    v-bind="forwardedProps"
    :class="
      cn('flex text-lg font-semibold leading-none tracking-tight', props.class)
    "
  >
    <slot></slot>
  </AlertDialogTitle>
</template>
