<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:18:16
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { TabsIndicatorProps } from 'reka-ui';

import { computed, reactive } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { TabsIndicator, useForwardProps } from 'reka-ui';

const props = defineProps<TabsIndicatorProps & { class?: any }>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return reactive(delegated);
});

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsIndicator
    v-bind="forwardedProps"
    :class="
      cn(
        'absolute bottom-0 left-0 z-10 h-full w-1/2 translate-x-[--reka-tabs-indicator-position] rounded-full px-0 py-1 pr-1 transition-[width,transform] duration-300',
        props.class,
      )
    "
  >
    <div
      class="bg-background text-foreground inline-flex h-full w-full items-center justify-center rounded-md px-3 py-1 text-sm font-medium whitespace-nowrap focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
    >
      <slot></slot>
    </div>
  </TabsIndicator>
</template>
