<template>
  <ALayout class="wh-full">
    <LayoutFeature />
    <ALayoutHeader v-if="getShowFullHeaderRef" />
    <ALayout class="w-full h-full">
      <LayoutSider v-if="getShowSider" />
      <ALayout class="w-full h-full relative">
        <LayoutHeader v-if="getShowInsetHeaderRef" />
        <LayoutTabs v-if="getShowTabs" />
        <ALayoutContent
          class="adp-default-layout-content overflow-y-auto transition-base bg-[var(--color-fill-2)] relative"
        >
          <LayoutContent />
          <SettingDrawer />
        </ALayoutContent>
        <LayoutFooter />
      </ALayout>
    </ALayout>
    <a-back-top
      target-container=".adp-default-layout-content"
      :style="{ position: 'absolute' }"
    />
  </ALayout>
</template>

<script lang="ts" setup>
  import {
    useHeaderSetting,
    useMenuSetting,
    useMultipleTabSetting,
  } from '@/hooks/setting';
  import {
    LayoutContent,
    LayoutFooter,
    LayoutSider,
    SettingDrawer,
    LayoutHeader,
    LayoutTabs,
    LayoutFeature,
  } from '../common';

  const { getShowSider } = useMenuSetting();
  const { getShowFullHeaderRef, getShowInsetHeaderRef } = useHeaderSetting();
  const { getShowTabs } = useMultipleTabSetting();
</script>

<style lang="less" scoped></style>
