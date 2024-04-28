<template>
  <!--  <div :class="getShowFullHeaderRef"> </div>-->

  <div class="w-full">
    <LayoutHeader v-if="getShowInsetHeaderRef" />
    <LayoutTabs v-if="getShowTabs" />
  </div>
</template>

<script lang="ts" setup>
  import { computed, CSSProperties, unref } from 'vue';
  import {
    useHeaderSetting,
    useMenuSetting,
    useMultipleTabSetting,
  } from '@/hooks/setting';
  import LayoutHeader from '../header/index.vue';
  import LayoutTabs from '../tabs/index.vue';

  const HEADER_HEIGHT = 48;

  const TABS_HEIGHT = 32;

  const { getShowTabs } = useMultipleTabSetting();
  const { getShowFullHeaderRef, getShowInsetHeaderRef } = useHeaderSetting();

  // const getIsShowPlaceholderDom = computed(() => {
  //   return unref(getFixed) || unref(getShowFullHeaderRef);
  // });

  // const getWrapStyle = computed((): CSSProperties => {
  //   const style: CSSProperties = {};
  //   // if (unref(getFixed)) {
  //   style.width = unref(getCalcMenuWidth);
  //   // }
  //   if (unref(getShowFullHeaderRef)) {
  //     style.top = `${HEADER_HEIGHT}px`;
  //   }
  //   return style;
  // });

  // const getPlaceholderDomStyle = computed((): CSSProperties => {
  //   let height = 0;
  //   if (!(unref(getAutoCollapse) && unref(getIsUnFold))) {
  //     if (
  //       (unref(getShowFullHeaderRef) || !unref(getSplit)) &&
  //       unref(getShowHeader) &&
  //       !unref(getFullContent)
  //     ) {
  //       height += HEADER_HEIGHT;
  //     }
  //     if (unref(getShowMultipleTab) && !unref(getFullContent)) {
  //       height += TABS_HEIGHT;
  //     }
  //     setHeaderHeight(height);
  //   }
  //   return {
  //     height: `${height}px`,
  //   };
  // });
</script>

<style lang="less" scoped></style>
