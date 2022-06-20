<template>
  <div v-if="showTooltip">
    <a-popover :position="props.position">
      <div class="flex-center h-full cursor-pointer">
        <slot></slot>
      </div>
      <template #content>
        {{ props.tooltipContent }}
      </template>
    </a-popover>
  </div>
  <div v-else class="flex-center cursor-pointer">
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  interface Props {
    /** tooltip显示文本 */
    tooltipContent?: string;
    /** tooltip的位置 */
    position?:
      | 'top'
      | 'tl'
      | 'tr'
      | 'bottom'
      | 'bl'
      | 'br'
      | 'left'
      | 'lt'
      | 'lb'
      | 'right'
      | 'rt'
      | 'rb';
    /** class类 */
    contentClass?: string;
    /** 反转模式下 */
    inverted?: boolean;
  }
  const props = withDefaults(defineProps<Props>(), {
    tooltipContent: '',
    position: 'bottom',
    contentClass: '',
    inverted: false,
  });

  const showTooltip = computed(() => Boolean(props.tooltipContent));

  // const computedClass = computed(() =>
  //   [props.contentClass, props.inverted ? 'hover:bg-primary' : 'hover:bg-[#f6f6f6]'].join(' ')
  // );
</script>
<style scoped></style>
