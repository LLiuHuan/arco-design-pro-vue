<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:44:31
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type {
  DropdownMenuCheckboxItemEmits,
  DropdownMenuCheckboxItemProps,
} from 'reka-ui';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { Check } from 'lucide-vue-next';
import {
  DropdownMenuCheckboxItem,
  DropdownMenuItemIndicator,
  useForwardPropsEmits,
} from 'reka-ui';

const props = defineProps<DropdownMenuCheckboxItemProps & { class?: any }>();
const emits = defineEmits<DropdownMenuCheckboxItemEmits>();

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DropdownMenuCheckboxItem
    v-bind="forwarded"
    :class="
      cn(
        'focus:bg-accent focus:text-accent-foreground outline-hidden relative flex cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
        props.class,
      )
    "
  >
    <span class="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <DropdownMenuItemIndicator>
        <Check class="h-4 w-4" />
      </DropdownMenuItemIndicator>
    </span>
    <slot></slot>
  </DropdownMenuCheckboxItem>
</template>
