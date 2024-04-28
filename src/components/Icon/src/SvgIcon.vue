<template>
  <template v-if="renderLocalIcon">
    <svg
      aria-hidden="true"
      v-bind="bindAttrs"
      class="svg-icon"
      :class="[spin && 'svg-icon-spin']"
      :style="getStyle"
      width="1em"
      height="1em"
    >
      <use :xlink:href="symbolId" fill="currentColor" />
    </svg>
  </template>
  <template v-else>
    <Icon
      v-if="icon"
      :icon="icon"
      v-bind="bindAttrs"
      class="svg-icon"
      :class="[spin && 'svg-icon-spin']"
      :style="getStyle"
    />
  </template>
</template>

<script setup lang="ts">
  import type { CSSProperties } from 'vue';
  import { computed, useAttrs } from 'vue';
  import { Icon } from '@iconify/vue';

  defineOptions({ name: 'SvgIcon' });

  /**
   * 图标组件
   * - 支持iconify和本地svg图标
   * - 同时传递了icon和localIcon，localIcon会优先渲染
   */
  interface Props {
    /** Icon name - [图标名称] */
    icon?: string;
    /** The file name of the local svg - [本地svg的文件名] */
    localIcon?: string;
    /** Icon size - [图标大小] */
    size?: string | number;
    /** Icon color - [图标颜色] */
    color?: string;
    /** Whether to rotate - [是否旋转] */
    spin?: boolean;
    /** The rotation angle - [旋转角度] */
    rotate?: number;
  }

  const props = withDefaults(defineProps<Props>(), {
    spin: false,
    rotate: 0,
  });

  const attrs = useAttrs();

  const bindAttrs = computed<{ class: string; style: string }>(() => ({
    class: (attrs.class as string) || '',
    style: (attrs.style as string) || '',
  }));

  const getStyle = computed((): CSSProperties => {
    const { size, rotate, color } = props;
    let s = `${size}`;
    s = `${s.replace('px', '')}px`;
    return {
      width: s,
      height: s,
      transform: `rotate(${rotate}deg)`,
      color,
    };
  });

  const symbolId = computed(() => {
    const { VITE_ICON_LOCAL_PREFIX: prefix } = import.meta.env;

    const defaultLocalIcon = 'no-icon';

    const icon = props.localIcon || defaultLocalIcon;

    return `#${prefix}-${icon}`;
  });

  /** 渲染本地icon */
  const renderLocalIcon = computed(() => props.localIcon || !props.icon);
</script>

<style lang="less" scoped>
  .svg-icon {
    display: inline-block;
    width: 1em;
    height: 1em;
    color: inherit;
    font-style: normal;
    vertical-align: -0.125rem;
    outline: none;
  }

  .svg-icon-spin {
    animation: adp-loading-circle 1s infinite linear;
  }
</style>
