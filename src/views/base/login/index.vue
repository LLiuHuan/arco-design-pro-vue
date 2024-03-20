<template>
  <div class="flex h-full">
    <AppLogo
      class="fixed top-24px left-22px text-[var(--color-fill-1)] text-20px"
      :title="$t('system.title')"
    ></AppLogo>
    <LoginBg
      class="w-35%"
      style="background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%)"
    />
    <div class="flex flex-1 items-center justify-center pb-40px relative">
      <div class="content-inner">
        <div
          class="text-[var(--color-text-1)] text-24px font-medium leading-8"
          >{{ $t(activeModule.label) }}</div
        >
        <div>
          <transition name="fade-slide" mode="out-in" appear>
            <component :is="activeModule.component" />
          </transition>
        </div>
      </div>
      <div class="footer absolute right-0 bottom-0 w-full">
        <div
          class="flex justify-center items-center text-[var(--color-text-2)] h-40px"
        >
          Arco Design Pro © 2024
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import type { Component } from 'vue';
  import { AppLogo } from '@/components/Application';
  import {
    BindWechat,
    CodeLogin,
    PwdLogin,
    Register,
    ResetPwd,
    LoginBg,
    ForgetPwd,
  } from './components';
  import { loginModuleLabels } from './enum';

  interface Props {
    /** 登录模块分类 */
    module: LoginModuleType;
  }

  const props = defineProps<Props>();

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
