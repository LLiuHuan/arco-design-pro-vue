<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 16:55:32
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';

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

  defineOptions({ name: 'HoverContainer' });

  const props = withDefaults(defineProps<Props>(), {
    tooltipContent: '',
    position: 'bottom',
    contentClass: '',
    inverted: false,
  });

  const { getIsMobile } = useRootSetting();

  const showTooltip = computed(() =>
    Boolean(props.tooltipContent && !unref(getIsMobile)),
  );

  const contentClassName = computed(
    () =>
      `${props.contentClass} ${props.inverted ? 'hover:bg-primary' : 'hover:bg-#f6f6f6'}`,
  );
</script>

<template>
  <div v-if="showTooltip">
    <ATooltip :content="tooltipContent" :position="position" mini>
      <div
        :class="contentClassName"
        class="flex-center h-full cursor-pointer dark:hover:bg-#333"
      >
        <slot></slot>
      </div>
    </ATooltip>
  </div>
  <div
    v-else
    :class="contentClassName"
    class="flex-center cursor-pointer dark:hover:bg-#333"
  >
    <slot></slot>
  </div>
</template>

<style lang="less" scoped></style>
