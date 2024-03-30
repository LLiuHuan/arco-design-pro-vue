<template>
  <ALayoutHeader
    class="flex items-center justify-between h-64px bg-[--color-bg-2] w-full transition-all-300"
  >
    <div class="flex-center">
      <LayoutTrigger v-if="getShowHeaderTrigger" :sider="false"></LayoutTrigger>
    </div>

    <div class="flex-center">
      <ThemeBtn></ThemeBtn>
      <LanguageBtn></LanguageBtn>
      <FullScreenBtn></FullScreenBtn>
      <SettingBtn></SettingBtn>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts" setup>
  import { useMenuSetting } from '@/hooks/setting';
  import LayoutTrigger from '../trigger/index.vue';
  import {
    SettingBtn,
    FullScreenBtn,
    LanguageBtn,
    ThemeBtn,
  } from './components';

  const { getShowHeaderTrigger } = useMenuSetting();
</script>

<style lang="less" scoped></style>
