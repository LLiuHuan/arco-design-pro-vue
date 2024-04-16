<template>
  <div v-if="true" v-show="true" :style="getHiddenDomStyle"></div>
  <ALayoutSider
    ref="siderRef"
    class="z-99 !fixed-tl h-full"
    :width="getMenuWidth"
    collapsible
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :hide-trigger="!getShowSiderTrigger"
    breakpoint="lg"
    :style="getSiderDomStyle"
    :theme="getMenuTheme"
    @breakpoint="onBreakpointChange"
  >
    <template #trigger>
      <LayoutTrigger />
    </template>
    <VerticalMenu />
    <LayoutDragBar ref="dragBarRef" />
  </ALayoutSider>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties, ref, unref } from 'vue';
  import { LayoutTrigger } from '@/layout/common';
  import { useMenuSetting } from '@/hooks/setting';
  import { LayoutDragBar, VerticalMenu } from './components';
  import { useDragLine, useSiderEvent } from './helpers';

  const dragBarRef = ref<ElRef>(null);
  const siderRef = ref<ElRef>(null);

  const {
    getMenuWidth,
    getCollapsed,
    getMenuTheme,
    getRealWidth,
    getShowSiderTrigger,
  } = useMenuSetting();

  useDragLine(siderRef, dragBarRef);

  const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

  // 隐藏的dom样式
  const getHiddenDomStyle = computed((): CSSProperties => {
    const width = `${unref(getRealWidth)}px`;
    return {
      width,
      overflow: 'hidden',
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.3s',
    };
  });

  const getSiderDomStyle = computed((): CSSProperties => {
    const width = `${unref(getRealWidth)}px`;
    return {
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.3s',
    };
  });
</script>

<style lang="less" scoped>
  //@prefix-cls: ~'@{name}-layout-sider';
  //
  //.@{prefix-cls} {
  //  z-index: 99;
  //
  //  &--fixed {
  //    position: fixed;
  //    top: 0;
  //    left: 0;
  //    height: 100%;
  //  }
  //
  //  &--mix {
  //    top: 48px;
  //    height: calc(100% - 48px);
  //  }
  //}
</style>
