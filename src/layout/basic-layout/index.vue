<template>
  <ALayout class="wh-full">
    <ALayoutHeader v-if="false"> </ALayoutHeader>
    <ALayout class="w-full h-full">
      <LayoutSider></LayoutSider>
      <ALayout class="w-full h-full relative">
        <LayoutHeader></LayoutHeader>
        <ALayoutContent
          class="adp-default-layout-content overflow-y-auto transition-all-300 bg-[var(--color-fill-2)]"
        >
          <LayoutContent />
          <SettingDrawer></SettingDrawer>
        </ALayoutContent>
        <LayoutFooter></LayoutFooter>
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
    LayoutContent,
    LayoutFooter,
    LayoutSider,
    SettingDrawer,
    LayoutHeader,
  } from '../common';
</script>

<style lang="less" scoped></style>
