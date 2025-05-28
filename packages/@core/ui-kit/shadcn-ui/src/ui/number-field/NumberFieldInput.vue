<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:39:01
 * @LastEditTime: 2025-05-27 10:09:54
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { cn } from '@arco-core/shared/utils';

import { NumberFieldInput } from 'reka-ui';
</script>

<template>
  <NumberFieldInput
    :class="
      cn(
        'border-input placeholder:text-muted-foreground focus-visible:ring-ring flex h-9 w-full rounded-md border bg-transparent py-1 text-center text-sm shadow-xs transition-colors focus-visible:ring-1 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50',
      )
    "
    data-slot="input"
  />
</template>
