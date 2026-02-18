<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2026-02-19 01:11:13
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import { cn } from '@qin-core/shared/utils';

import { useVModel } from '@vueuse/core';

const props = defineProps<{
  class?: any;
  defaultValue?: number | string;
  modelValue?: number | string;
}>();

const emits = defineEmits<{
  (e: 'update:modelValue', payload: number | string): void;
}>();

const modelValue = useVModel(props, 'modelValue', emits, {
  defaultValue: props.defaultValue,
  passive: true,
});
</script>

<template>
  <input
    v-model="modelValue"
    :class="
      cn(
        'border-input bg-background ring-offset-background placeholder:text-muted-foreground/50 focus-visible:ring-ring focus-visible:outline-hidden flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  />
</template>
<style lang="scss" scoped>
input {
  --ring: var(--primary);

  &::-ms-reveal,
  &::-ms-clear {
    display: none;
  }

  &::-webkit-credentials-auto-fill-button,
  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    display: none;
  }
}
</style>
