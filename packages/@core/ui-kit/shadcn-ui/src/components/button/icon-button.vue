<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:14:12
 * @LastEditTime: 2025-05-27 10:21:46
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { ButtonVariants } from '../../ui';
import type { ArcoButtonProps } from './button';

import { computed, useSlots } from 'vue';

import { cn } from '@arco-core/shared/utils';

import { ArcoTooltip } from '../tooltip';
import ArcoButton from './button.vue';

interface Props extends ArcoButtonProps {
  class?: any;
  disabled?: boolean;
  onClick?: () => void;
  tooltip?: string;
  tooltipDelayDuration?: number;
  tooltipSide?: 'bottom' | 'left' | 'right' | 'top';
  variant?: ButtonVariants;
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  onClick: () => {},
  tooltipDelayDuration: 200,
  tooltipSide: 'bottom',
  variant: 'icon',
});

const slots = useSlots();

const showTooltip = computed(() => !!slots.tooltip || !!props.tooltip);
</script>

<template>
  <ArcoButton
    v-if="!showTooltip"
    :class="cn('rounded-full', props.class)"
    :disabled="disabled"
    :variant="variant"
    size="icon"
    @click="onClick"
  >
    <slot></slot>
  </ArcoButton>

  <ArcoTooltip
    v-else
    :delay-duration="tooltipDelayDuration"
    :side="tooltipSide"
  >
    <template #trigger>
      <ArcoButton
        :class="cn('rounded-full', props.class)"
        :disabled="disabled"
        :variant="variant"
        size="icon"
        @click="onClick"
      >
        <slot></slot>
      </ArcoButton>
    </template>
    <slot v-if="slots.tooltip" name="tooltip"> </slot>
    <template v-else>
      {{ tooltip }}
    </template>
  </ArcoTooltip>
</template>
