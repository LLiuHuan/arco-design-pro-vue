<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:11:38
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { SelectSeparatorProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { SelectSeparator } from 'reka-ui';

const props = defineProps<SelectSeparatorProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <SelectSeparator
    v-bind="delegatedProps"
    :class="cn('bg-muted -mx-1 my-1 h-px', props.class)"
  />
</template>
