<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 11:33:35
 * @LastEditTime: 2025-05-27 11:38:16
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { CustomRenderType } from '../types';

import {
  ArcoHelpTooltip,
  ArcoRenderContent,
  FormLabel,
} from '@arco-core/shadcn-ui';
import { cn } from '@arco-core/shared/utils';

interface Props {
  class?: string;
  colon?: boolean;
  help?: CustomRenderType;
  label?: CustomRenderType;
  required?: boolean;
}

const props = defineProps<Props>();
</script>

<template>
  <FormLabel :class="cn('flex items-center', props.class)">
    <span v-if="required" class="text-destructive mr-[2px]">*</span>
    <slot></slot>
    <ArcoHelpTooltip v-if="help" trigger-class="size-3.5 ml-1">
      <ArcoRenderContent :content="help" />
    </ArcoHelpTooltip>
    <span v-if="colon && label" class="ml-[2px]">:</span>
  </FormLabel>
</template>
