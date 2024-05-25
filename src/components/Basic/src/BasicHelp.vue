<template>
  <ATooltip v-bind="getProps">
    <template #content>
      <div>
        <p v-for="(item, index) in getText" :key="index" class="mb-0">
          {{ showIndex ? (getText.length > 0 ? index + 1 : '') : '' }}
          {{ item }}
        </p>
      </div>
    </template>
    <span
      class="inline-block ml-6px text-14px cursor-pointer text-[var(--color-fill-4)] hover:text-[rgba(var(--primary-6))]"
    >
      <slot name="icon">
        <IconExclamationCircle />
      </slot>
    </span>
  </ATooltip>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { isString } from '@/utils/common';
  import { ClassName } from '~/types/global';

  interface Props {
    /**
     * @description 是否显示序列号
     * @description Whether to display the serial number
     * @default: false
     */
    showIndex?: boolean;
    /**
     * @description 帮助文本列表
     * @description Help text list
     */
    text: string | string[];
    /**
     * @description 弹出位置
     * @description Popping position
     */
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
    /**
     * @description 是否展示为迷你尺寸
     * @description Whether to display in mini size
     */
    mini?: boolean;
    /**
     * @description 弹出框背景颜色
     * @description Pop-up box background color
     */
    backgroundColor?: string;
    /**
     * @description 弹出框内容的类名
     * @description The class name of the pop-up box content
     */
    contentClass?: ClassName;
    /**
     * @description 弹出框内容的样式
     * @description Pop-up box content style
     */
    contentStyle?: import('vue').CSSProperties;
    /**
     * @description 弹出框箭头的类名
     * @description The class name of the popup box arrow
     */
    arrowClass?: ClassName;
    /**
     * @description 弹出框箭头的样式
     * @description Popup box arrow style
     */
    arrowStyle?: import('vue').CSSProperties;
    /**
     * @description 弹出框的挂载容器
     * @description Pop-up box mounting container
     */
    popupContainer?: string | HTMLElement | null | undefined;
  }

  const props = withDefaults(defineProps<Props>(), {
    position: 'right',
    mini: false,
  });

  const getProps = computed(() => {
    return { ...props };
  });

  const getText = computed(() => {
    if (isString(props.text)) {
      return [props.text];
    }

    return props.text;
  });
</script>

<style lang="less" scoped></style>
