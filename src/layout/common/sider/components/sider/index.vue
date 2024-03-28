<template>
  <div v-if="true" v-show="true" :style="getHiddenDomStyle"></div>
  <ALayoutSider
    ref="siderRef"
    :class="getSiderClass"
    :width="getMenuWidth"
    collapsible
    :collapsed="getCollapsed"
    :collapsed-width="getCollapsedWidth"
    :hide-trigger="!getShowTrigger"
    breakpoint="lg"
    :style="getSiderDomStyle"
    :theme="getMenuTheme"
    @breakpoint="onBreakpointChange"
  >
    <template #trigger>
      <LayoutTrigger />
    </template>
    {{ getTrigger }}
    {{ getShowTrigger }}
    {{ getMenuWidth }}
    {{ getCollapsed }}
    <LayoutDragBar ref="dragBarRef"></LayoutDragBar>
  </ALayoutSider>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties, ref, unref } from 'vue';
  import { TriggerEnum } from '@/enums';
  import { LayoutTrigger } from '@/layout/common';
  import { useDesign } from '@/hooks/common';
  import { useMenuSetting } from '@/hooks/setting';
  import { LayoutDragBar } from './components';
  import { useDragLine, useSiderEvent } from './helpers';

  const dragBarRef = ref<ElRef>(null);
  const siderRef = ref<ElRef>(null);

  const { prefixCls } = useDesign('layout-sider');
  const { getMenuWidth, getCollapsed, getTrigger, getMenuTheme, getRealWidth } =
    useMenuSetting();

  useDragLine(siderRef, dragBarRef);

  const { getCollapsedWidth, onBreakpointChange } = useSiderEvent();

  const getShowTrigger = computed(() => {
    const trigger = unref(getTrigger);

    return trigger !== TriggerEnum.NONE && trigger === TriggerEnum.FOOTER;
  });

  // 隐藏的dom样式
  const getHiddenDomStyle = computed((): CSSProperties => {
    const width = `${unref(getRealWidth)}px`;
    return {
      width,
      overflow: 'hidden',
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
      transition: 'all 0.2s',
    };
  });

  // 侧边栏类名
  const getSiderClass = computed(() => {
    return [
      prefixCls,
      {
        [`${prefixCls}--fixed`]: true,
        [`${prefixCls}--mix`]: false,
      },
    ];
  });

  const getSiderDomStyle = computed((): CSSProperties => {
    const width = `${unref(getRealWidth)}px`;
    return {
      flex: `0 0 ${width}`,
      maxWidth: width,
      minWidth: width,
    };
  });

  // const showClassSideBarRef = computed(() => {
  //   return unref(getSplit) ? !unref(getMenuHidden) : true;
  // });
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name}-layout-sider';

  .@{prefix-cls} {
    z-index: 99;

    &--fixed {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
    }

    &--mix {
      top: 48px;
      height: calc(100% - 48px);
    }
  }
</style>
