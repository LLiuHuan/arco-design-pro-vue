<template>
  <ALayout :class="prefixCls">
    <ALayoutHeader v-if="false"> </ALayoutHeader>
    <ALayout class="w-full h-full">
      <LayoutSider></LayoutSider>
      <ALayout class="w-full h-full relative">
        <LayoutHeader></LayoutHeader>
        <ALayoutContent
          :class="`${prefixCls}__content`"
          class="overflow-y-auto transition-all-300"
        >
          <LayoutContent />
          <SettingDrawer></SettingDrawer>
        </ALayoutContent>
        <LayoutFooter></LayoutFooter>
      </ALayout>
    </ALayout>
    <a-back-top
      :target-container="`.${prefixCls}__content`"
      :style="{ position: 'absolute' }"
    />
  </ALayout>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/common';
  import {
    LayoutContent,
    LayoutFooter,
    LayoutSider,
    SettingDrawer,
    LayoutHeader,
  } from '../common';

  const { prefixCls } = useDesign('default-layout');
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name}-default-layout';

  .@{prefix-cls} {
    width: 100%;
    height: 100%;
  }

  .@{prefix-cls}__content {
    //min-height: 100vh;
    //overflow-y: hidden;
    background-color: var(--color-fill-2);
    transition: padding 0.2s cubic-bezier(0.34, 0.69, 0.1, 1);
  }

  .nav-btn {
    border-color: rgb(var(--gray-2));
    color: rgb(var(--gray-8));
    font-size: 16px;
  }
</style>
