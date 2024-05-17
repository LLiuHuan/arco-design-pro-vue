<template>
  <div class="relative wh-full">
    <header class="absolute-tl w-full flex justify-between items-center px-20px pt-20px">
      <AppLogo
          :title="VITE_GLOB_APP_TITLE"
          class="text-[var(--color-fill-1)] text-20px"
      ></AppLogo>

      <div class="z-101">
        <AButton
            class="!text-[var(--color-text-1)]"
            type="text"
            @click="toggleDarkMode"
        >
          <DarkModeSwitch></DarkModeSwitch>
        </AButton>

        <ADropdown trigger="click" @select="handleSelect">
          <AButton class="!text-[var(--color-text-1)]" type="text">
            <SvgIcon icon="heroicons:language-16-solid" size="20"></SvgIcon>
          </AButton>
          <template #content>
            <ADoption :value="LOCALE.ZH_CN">中文</ADoption>
            <ADoption :value="LOCALE.EN_US">English</ADoption>
          </template>
        </ADropdown>
      </div>
    </header>

    <main :class="getContentXScrollable ? 'overflow-x-hidden' : ''" class="wh-full flex-center">
      <RouterView/>
    </main>

    <footer class="absolute-bl w-full flex-center text-[var(--color-text-2)] h-40px">
      Arco Design Pro © {{ year }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
import {AppLogo} from "@/components/AppLogo";
import {LOCALE} from "@/settings";
import {DarkModeSwitch} from "@/components/DarkModeSwitch";
import {SvgIcon} from "@/components/Icon";
import {getAppEnvConfig} from "@/utils/envs";
import {useRootSetting} from "@/hooks/setting";
import {dateUtil} from "@/utils/date";
import {LocaleType} from "~/types/config";
import {useLocale} from "@/locale/useLocale";

const year = dateUtil().year();
const {VITE_GLOB_APP_TITLE} = getAppEnvConfig();

const {changeLocale} = useLocale();

const handleSelect = (value: string) => {
  changeLocale(value as LocaleType);
};

const {toggleDarkMode, getContentXScrollable} = useRootSetting();
</script>

<style lang="less" scoped></style>
