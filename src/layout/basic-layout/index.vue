<template>
  <ALayout class="wh-full transition-base">
    <LayoutFeature />
    <ALayoutHeader v-if="getShowFullHeaderRef" />
    <ALayout class="w-full h-full" :has-sider="getIsMixSidebar">
      <LayoutSider v-if="getShowSider" />
      <ALayout class="w-full h-full relative">
        <LayoutHeader v-if="getShowInsetHeaderRef" />
        <LayoutTabs v-if="getShowTabs" />
        <ALayoutContent
          class="overflow-y-auto transition-base bg-[var(--color-fill-2)] relative"
        >
          <LayoutContent />
          <SettingDrawer />
        </ALayoutContent>
        <LayoutFooter />
      </ALayout>
    </ALayout>
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

  const { getShowSider, getIsMixSidebar } = useMenuSetting();
  const { getShowFullHeaderRef, getShowInsetHeaderRef } = useHeaderSetting();
  const { getShowTabs } = useMultipleTabSetting();
</script>

<style lang="less" scoped></style>
