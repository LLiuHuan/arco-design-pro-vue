<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:46:20
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { RadioGroupItemProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { Circle } from 'lucide-vue-next';
import { RadioGroupIndicator, RadioGroupItem, useForwardProps } from 'reka-ui';

const props = defineProps<RadioGroupItemProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <RadioGroupItem
    v-bind="forwardedProps"
    :class="
      cn(
        'border-primary text-primary focus-visible:ring-ring focus:outline-hidden aspect-square h-4 w-4 rounded-full border shadow-sm focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator class="flex items-center justify-center">
      <Circle class="h-2.5 w-2.5 fill-current text-current" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>
