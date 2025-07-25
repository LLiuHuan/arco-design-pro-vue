<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 10:47:21
 * @LastEditTime: 2025-06-15 17:15:38
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { TabsEmits, TabsProps } from './types';

import { useForwardPropsEmits } from '@arco-core/composables';
import { ChevronLeft, ChevronRight } from '@arco-core/icons';
import { ArcoScrollbar } from '@arco-core/shadcn-ui';

import { Tabs, TabsChrome } from './components';
import { useTabsDrag } from './use-tabs-drag';
import { useTabsViewScroll } from './use-tabs-view-scroll';

interface Props extends TabsProps {}

defineOptions({
  name: 'TabsView',
});

const props = withDefaults(defineProps<Props>(), {
  contentClass: 'adp-tabs-content',
  draggable: true,
  styleType: 'chrome',
  wheelable: true,
});

const emit = defineEmits<TabsEmits>();

const forward = useForwardPropsEmits(props, emit);

const {
  handleScrollAt,
  handleWheel,
  scrollbarRef,
  scrollDirection,
  scrollIsAtLeft,
  scrollIsAtRight,
  showScrollButton,
} = useTabsViewScroll(props);

function onWheel(e: WheelEvent) {
  if (props.wheelable) {
    handleWheel(e);
    e.stopPropagation();
    e.preventDefault();
  }
}

useTabsDrag(props, emit);
</script>

<template>
  <div class="flex h-full flex-1 overflow-hidden">
    <!-- 左侧滚动按钮 -->
    <span
      v-show="showScrollButton"
      :class="{
        'hover:bg-muted text-muted-foreground cursor-pointer': !scrollIsAtLeft,
        'pointer-events-none opacity-30': scrollIsAtLeft,
      }"
      class="border-r px-2"
      @click="scrollDirection('left')"
    >
      <ChevronLeft class="size-4 h-full" />
    </span>

    <div
      :class="{
        'pt-[3px]': styleType === 'chrome',
      }"
      class="size-full flex-1 overflow-hidden"
    >
      <ArcoScrollbar
        ref="scrollbarRef"
        :shadow-bottom="false"
        :shadow-top="false"
        class="h-full"
        horizontal
        scroll-bar-class="z-10 hidden "
        shadow
        shadow-left
        shadow-right
        @scroll-at="handleScrollAt"
        @wheel.passive="onWheel"
      >
        <TabsChrome
          v-if="styleType === 'chrome'"
          v-bind="{ ...forward, ...$attrs, ...$props }"
        />

        <Tabs v-else v-bind="{ ...forward, ...$attrs, ...$props }" />
      </ArcoScrollbar>
    </div>

    <!-- 右侧滚动按钮 -->
    <span
      v-show="showScrollButton"
      :class="{
        'hover:bg-muted text-muted-foreground cursor-pointer': !scrollIsAtRight,
        'pointer-events-none opacity-30': scrollIsAtRight,
      }"
      class="hover:bg-muted text-muted-foreground cursor-pointer border-l px-2"
      @click="scrollDirection('right')"
    >
      <ChevronRight class="size-4 h-full" />
    </span>
  </div>
</template>
