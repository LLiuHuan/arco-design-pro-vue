<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-06-14 14:59:44
 * @LastEditTime: 2024-08-22 14:15:09
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { computed } from 'vue';

  interface Props {
    loginMode: LoginModuleType;
  }

  const props = defineProps<Props>();

  const { t } = useI18n();

  const getTitle = computed(() => {
    const loginModuleLabels = {
      'pwd-login': 'sys.login.pwdLogin.title',
      'code-login': 'sys.login.codeLogin.title',
      'register': 'sys.login.register.title',
      'reset-pwd': 'sys.login.resetPwd.title',
      'bind-wechat': 'sys.login.bindWeChat.title',
      'bind-github': '',
      'forget-pwd': 'sys.login.forgetPwd.title',
    };

    return loginModuleLabels[props.loginMode];
  });
</script>

<template>
  <div
    class="justify-start -enter-x text-[var(--color-text-1)] text-24px font-medium leading-8"
  >
    {{ t(getTitle) }}
  </div>
</template>

<style lang="less" scoped></style>
