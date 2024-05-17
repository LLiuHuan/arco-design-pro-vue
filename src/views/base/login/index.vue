<template>
  <div class="wh-full flex">
    <LoginBg
      v-if="!getIsMobile"
      class="w-35%"
      style="background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%)"
    />
    <div class="flex flex-1 items-center justify-center pb-40px relative">
      <div class="content-inner transition-base">
        <transition appear mode="out-in" name="fade-slide">
          <component
            :is="activeModule.component"
            :style="{
              width: getIsMobile ? '290px' : '320px',
            }"
          />
        </transition>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { loginModuleLabels } from './enum';
  import {
    BindWechat,
    CodeLogin,
    ForgetPwd,
    LoginBg,
    PwdLogin,
    Register,
    ResetPwd,
  } from './components';

  const { getIsMobile } = useRootSetting();

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
