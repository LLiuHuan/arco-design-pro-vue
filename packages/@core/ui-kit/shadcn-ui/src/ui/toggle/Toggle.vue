<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-07-02 10:55:10
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ToggleEmits, ToggleProps } from 'reka-ui';

import type { ToggleVariants } from './toggle';

import { computed } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { Toggle, useForwardPropsEmits } from 'reka-ui';

import { toggleVariants } from './toggle';

const props = withDefaults(
  defineProps<
    ToggleProps & {
      class?: any;
      size?: ToggleVariants['size'];
      variant?: ToggleVariants['variant'];
    }
  >(),
  {
    disabled: false,
    size: 'default',
    variant: 'default',
  },
);

const emits = defineEmits<ToggleEmits>();

const delegatedProps = computed(() => {
  const { class: _, size: _size, variant: _variant, ...delegated } = props;

  return delegated;
});

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <Toggle
    v-bind="forwarded"
    :class="cn(toggleVariants({ variant, size }), props.class)"
  >
    <slot></slot>
  </Toggle>
</template>
