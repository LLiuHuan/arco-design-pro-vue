<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 11:08:21
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { DialogDescriptionProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { DialogDescription } from 'reka-ui';

const props = defineProps<DialogDescriptionProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <DialogDescription
    :class="cn('text-muted-foreground text-sm', props.class)"
    v-bind="delegatedProps"
  >
    <slot></slot>
  </DialogDescription>
</template>
