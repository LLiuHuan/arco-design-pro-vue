<template>
  <div class="relative flex-center wh-full">
    <a-card
      :bordered="false"
      size="large"
      class="z-4 !w-auto rounded-20px shadow-sm"
    >
      <div class="w-300px sm:w-360px">
        {{ $t('system.title') }}
        <main class="pt-24px">
          <h3 class="text-18px text-primary font-medium">{{
            activeModule.label
          }}</h3>
          <div class="pt-24px">
            <component :is="activeModule.component" />
          </div>
        </main>
      </div>
    </a-card>
  </div>
</template>

<script setup lang="ts">
  import { computed } from 'vue';
  import type { Component } from 'vue';
  import {
    BindWechat,
    CodeLogin,
    PwdLogin,
    Register,
    ResetPwd,
  } from './components';
  import { loginModuleLabels } from './enum';

  interface Props {
    /** 登录模块分类 */
    module: UnionKey.LoginModule;
  }

  const props = defineProps<Props>();

  interface LoginModule {
    key: UnionKey.LoginModule;
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

<style scoped></style>
