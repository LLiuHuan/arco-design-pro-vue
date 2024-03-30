<template>
  <ALayoutHeader
    class="flex items-center justify-between h-64px bg-[--color-bg-2] w-full transition-all-300"
  >
    <div :class="`${prefixCls}-left`">
      <LayoutTrigger v-if="getShowHeaderTrigger" :sider="false"></LayoutTrigger>
    </div>

    <div :class="`${prefixCls}-right`">
      <ThemeBtn></ThemeBtn>
      <LanguageBtn></LanguageBtn>
      <FullScreenBtn></FullScreenBtn>
      <SettingBtn></SettingBtn>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts" setup>
  import { useDesign } from '@/hooks/common';
  import { useMenuSetting } from '@/hooks/setting';
  import LayoutTrigger from '../trigger/index.vue';
  import {
    SettingBtn,
    FullScreenBtn,
    LanguageBtn,
    ThemeBtn,
  } from './components';

  const { prefixCls } = useDesign('layout-header');

  const { getShowHeaderTrigger } = useMenuSetting();
</script>

<style lang="less" scoped>
  @prefix-cls: ~'@{name}-layout-header';

  .@{prefix-cls} {
    &-left {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
    }

    &-right {
      display: flex;
      align-items: center;
    }
  }
</style>
