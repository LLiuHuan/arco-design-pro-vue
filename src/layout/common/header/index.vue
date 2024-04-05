<template>
  <ALayoutHeader
    class="flex items-center justify-between bg-[--color-bg-2] w-full transition-base"
    :style="{ height: `${getHeaderHeight}px` }"
  >
    <div class="flex-center">
      <LayoutTrigger v-if="getShowHeaderTrigger" :sider="false"></LayoutTrigger>
    </div>

    <div class="flex-center h-40px">
      <ThemeBtn></ThemeBtn>
      <LanguageBtn></LanguageBtn>
      <FullScreenBtn></FullScreenBtn>
      <SettingBtn></SettingBtn>
      <UserAvatar></UserAvatar>
    </div>
  </ALayoutHeader>
</template>

<script lang="ts" setup>
  import { useHeaderSetting, useMenuSetting } from '@/hooks/setting';
  import LayoutTrigger from '../trigger/index.vue';
  import {
    SettingBtn,
    FullScreenBtn,
    LanguageBtn,
    ThemeBtn,
    UserAvatar,
  } from './components';

  const { getShowHeaderTrigger } = useMenuSetting();
  const { getHeaderHeight } = useHeaderSetting();
</script>

<style lang="less" scoped></style>
