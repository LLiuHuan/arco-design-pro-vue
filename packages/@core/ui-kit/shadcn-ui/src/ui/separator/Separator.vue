<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:54:25
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { SeparatorProps } from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { Separator } from 'reka-ui';

const props = defineProps<SeparatorProps & { class?: any; label?: string }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});
</script>

<template>
  <Separator
    v-bind="delegatedProps"
    :class="
      cn(
        'bg-border relative shrink-0',
        props.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
        props.class,
      )
    "
  >
    <span
      v-if="props.label"
      :class="
        cn(
          'text-muted-foreground bg-background absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center text-xs',
          props.orientation === 'vertical'
            ? 'w-[1px] px-1 py-2'
            : 'h-[1px] px-2 py-1',
        )
      "
    >
      {{ props.label }}
    </span>
  </Separator>
</template>
