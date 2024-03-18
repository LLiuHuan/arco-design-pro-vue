<template>
  <div>
    {{ name }}
    {{ $t('page.login.pwdLogin.title') }}
    <a-button @click="toLoginModule('register')">注册</a-button>
    <a-button @click="changeLanguage">切换中英文</a-button>
    <a-pagination
      :total="50"
      :size="'mini'"
      show-total
      show-jumper
      show-page-size
    />
  </div>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/hooks/component';
  import { useLocale } from '@/locale/useLocale';
  import { unref } from 'vue';
  import { LOCALE } from '@/settings';

  const name = 'pwd-login';
  const { toLoginModule } = useRouterPush();

  const changeLanguage = () => {
    console.log('changeLanguage');
    const { changeLocale, getLocale } = useLocale();
    if (unref(getLocale) === LOCALE.ZH_CN) {
      changeLocale(LOCALE.EN_US);
    } else {
      changeLocale(LOCALE.ZH_CN);
    }
  };
</script>

<style lang="less" scoped></style>
