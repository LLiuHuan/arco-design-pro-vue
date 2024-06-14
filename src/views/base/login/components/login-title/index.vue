<template>
  <div
    class="justify-start -enter-x text-[var(--color-text-1)] text-24px font-medium leading-8"
  >
    {{ $t(getTitle) }}
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';

  interface Props {
    loginMode: LoginModuleType;
  }

  const props = defineProps<Props>();

  const getTitle = computed(() => {
    const loginModuleLabels = {
      'pwd-login': 'sys.login.pwdLogin.title',
      'code-login': 'sys.login.codeLogin.title',
      'register': 'sys.login.register.title',
      'reset-pwd': 'sys.login.resetPwd.title',
      'bind-wechat': 'sys.login.bindWeChat.title',
      'forget-pwd': 'sys.login.forgetPwd.title',
    };

    return loginModuleLabels[props.loginMode];
  });
</script>

<style lang="less" scoped></style>
