<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-23 15:33:13
 * @LastEditTime: 2024-08-23 17:44:11
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  // import { useRootSetting } from '@/hooks/setting';
  import { dateUtil } from '@/utils/date';
  import { getAppEnvConfig } from '@/utils/envs';
  import { ThemeModeBtn } from '@/components/ThemeMode';
  import { AppLogo } from '@/components/AppLogo';
  // import { useLocale } from '@/hooks/web/useLocale';
  import { useAppStore } from '@/store/modules/app';
  import { LocaleDropdown } from '@/components/LocaleDropdown';
  import { LayoutContent } from '../common';
  import { AuthBG } from './components';

  defineOptions({ name: 'AuthLayout' });

  // const { getIsMobile } = useRootSetting();
  const appStore = useAppStore();

  const year = dateUtil().year();
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
</script>

<template>
  <div class="relative wh-full bg-[var(--color-bg-1)]">
    <header
      class="absolute-tl w-full flex justify-between items-center px-20px pt-20px"
    >
      <AppLogo
        :title="VITE_GLOB_APP_TITLE"
        class="text-[var(--color-fill-1)] text-20px"
      />

      <div class="z-101">
        <ThemeModeBtn :is-not-auto="true" />

        <LocaleDropdown />
      </div>
    </header>
    <main
      :class="appStore.setting.contentXScrollable ? 'overflow-x-hidden' : ''"
      class="wh-full flex-center"
    >
      <div class="wh-full flex">
        <AuthBG
          v-if="!appStore.isMobile"
          class="w-35%"
          style="
            background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
          "
        />
        <div class="flex flex-1 items-center justify-center pb-40px relative">
          <div class="content-inner transition-base">
            <LayoutContent
              :show-padding="false"
              :style="{
                width: appStore.isMobile ? '290px' : '360px',
              }"
            />
          </div>
        </div>
      </div>
    </main>

    <footer
      class="absolute-bl w-full flex-center text-[var(--color-text-2)] h-40px"
    >
      {{ VITE_GLOB_APP_TITLE }} © {{ year }}
    </footer>
  </div>
</template>

<style lang="less" scoped></style>
