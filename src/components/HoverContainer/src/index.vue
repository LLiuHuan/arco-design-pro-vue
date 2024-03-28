<template>
  <div v-if="showTooltip">
    <a-tooltip :position="position" mini :content="tooltipContent">
      <div
        class="flex-center h-full cursor-pointer dark:hover:bg-#333"
        :class="contentClassName"
      >
        <slot></slot>
      </div>
    </a-tooltip>
  </div>
  <div
    v-else
    class="flex-center cursor-pointer dark:hover:bg-#333"
    :class="contentClassName"
  >
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  defineOptions({ name: 'HoverContainer' });

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

  const contentClassName = computed(
    () =>
      `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`,
  );
</script>

<style lang="less" scoped></style>
