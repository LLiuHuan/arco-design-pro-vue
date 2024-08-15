<template>
  <div class="relative wh-full bg-[var(--color-bg-1)]">
    <header
      class="absolute-tl w-full flex justify-between items-center px-20px pt-20px"
    >
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
            <ADoption :value="LocaleEnum.zh_CN">中文</ADoption>
            <ADoption :value="LocaleEnum.en_US">English</ADoption>
          </template>
        </ADropdown>
      </div>
    </header>
    <main
      :class="getContentXScrollable ? 'overflow-x-hidden' : ''"
      class="wh-full flex-center"
    >
      <div class="wh-full flex">
        <LoginBg
          v-if="!getIsMobile"
          class="w-35%"
          style="
            background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
          "
        />
        <div class="flex flex-1 items-center justify-center pb-40px relative">
          <div class="content-inner transition-base">
            <transition appear mode="out-in" name="fade-slide">
              <component
                :is="activeModule.component"
                :style="{
                  width: getIsMobile ? '290px' : '360px',
                }"
              />
            </transition>
          </div>
        </div>
      </div>
    </main>

    <footer
      class="absolute-bl w-full flex-center text-[var(--color-text-2)] h-40px"
    >
      Arco Design Pro © {{ year }}
    </footer>
  </div>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { dateUtil } from '@/utils/date';
  import { getAppEnvConfig } from '@/utils/envs';
  import { LocaleType } from '~/types/config';
  import { DarkModeSwitch } from '@/components/DarkModeSwitch';
  import { SvgIcon } from '@/components/Icon';
  import { AppLogo } from '@/components/AppLogo';
  import { LocaleEnum } from '@/enums';
  import { useLocale } from '@/hooks/web/useLocale';
  import {
    BindGithub,
    BindWechat,
    CodeLogin,
    ForgetPwd,
    LoginBg,
    PwdLogin,
    Register,
    ResetPwd,
  } from './components';
  import { loginModuleLabels } from './enum';

  const { getIsMobile } = useRootSetting();

  interface Props {
    /** 登录模块分类 */
    module: LoginModuleType;
  }

  const props = defineProps<Props>();

  const year = dateUtil().year();
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  const { changeLocale } = useLocale();

  const handleSelect = (value: string) => {
    changeLocale(value as LocaleType);
  };

  const { toggleDarkMode, getContentXScrollable } = useRootSetting();

  interface LoginModule {
    key: LoginModuleType;
    label: string;
    component: Component;
  }

  const modules: LoginModule[] = [
    {
      key: 'pwd-login',
      label: loginModuleLabels['pwd-login'],
      component: PwdLogin,
    },
    {
      key: 'code-login',
      label: loginModuleLabels['code-login'],
      component: CodeLogin,
    },
    { key: 'register', label: loginModuleLabels.register, component: Register },
    {
      key: 'reset-pwd',
      label: loginModuleLabels['reset-pwd'],
      component: ResetPwd,
    },
    {
      key: 'bind-wechat',
      label: loginModuleLabels['bind-wechat'],
      component: BindWechat,
    },
    {
      key: 'bind-github',
      label: loginModuleLabels['bind-github'],
      component: BindGithub,
    },
    {
      key: 'forget-pwd',
      label: loginModuleLabels['forget-pwd'],
      component: ForgetPwd,
    },
  ];

  const activeModule = computed(() => {
    const active: LoginModule = { ...modules[0] };
    const findItem = modules.find((item) => item.key === props.module);
    if (findItem) {
      Object.assign(active, findItem);
    }
    return active;
  });
</script>

<style lang="less" scoped></style>
