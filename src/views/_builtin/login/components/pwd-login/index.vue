<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import { Notification, ValidatedError } from '@arco-design/web-vue';
  import {
    IconAlipayCircle,
    IconFaceBookCircleFill,
    IconGithub,
    IconGoogleCircleFill,
    IconQqCircleFill,
    IconWechat,
  } from '@arco-design/web-vue/es/icon';
  import { localStg } from '@/utils/cache';
  import { LOGIN_INFO } from '@/enums';
  import { useGo } from '@/hooks/web/usePage';
  import { useLoading } from '@adp/hooks';
  import { open } from '@/utils/common';
  import { useAuthStore } from '@/store/modules/auth';
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginTitle from '../login-title/index.vue';
  import { GITHUB_AUTHORIZE_URL } from '../../enum';

  const { toLoginModule } = useGo();

  interface LoginFormProps {
    username: string;
    password: string;
  }

  const errorMessage = ref('');
  const { loading, startLoading, endLoading } = useLoading();
  const { t } = useI18n();
  const authStore = useAuthStore();

  // const loginConfig = {
  //   rememberPassword: true,
  //   username: 'Arco', // 演示默认值
  //   password: 'arco123', // demo default value
  // };

  const loginConfig = ref(
    localStg.get(LOGIN_INFO) || {
      rememberPassword: true,
      username: 'super', // 演示默认值
      password: 'super', // demo default value
    },
  );

  const userInfo = reactive({
    username: unref(loginConfig).username,
    password: unref(loginConfig).password,
  });

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: LoginFormProps;
  }) => {
    if (!errors) {
      startLoading();
      try {
        await authStore.login(values.username, values.password);
        // 如果选中记住密码，就默认保存下来
        const { rememberPassword } = unref(loginConfig);
        const { username, password } = values;
        // 实际生产环境需要进行加密存储。
        // The actual production environment requires encrypted storage.
        if (rememberPassword) {
          localStg.set(LOGIN_INFO, {
            rememberPassword,
            username,
            password,
          });
        } else {
          localStg.remove(LOGIN_INFO);
        }
      } catch (err) {
        // 异常提示
        errorMessage.value = (err as Error).message;
      } finally {
        // 登录成功弹出欢迎提示
        console.log(t('sys.login.common.loginSuccess'));
        Notification.success({
          title: t('sys.login.common.loginSuccess'),
          content: t(`sys.login.common.welcomeBack`, {
            userName: authStore.userInfo.userName,
          }),
          duration: 3000,
        });

        endLoading();
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    // 是否记住密码
    loginConfig.value.rememberPassword = value;
  };
</script>

<template>
  <div>
    <LoginTitle login-mode="pwd-login" />

    <div class="h-32px leading-32px text-[rgba(var(--red-6))]">
      {{ errorMessage }}
    </div>
    <AForm
      :model="userInfo"
      class="-enter-x"
      layout="vertical"
      @submit="handleSubmit"
    >
      <AFormItem
        :rules="[
          {
            required: true,
            message: t('sys.login.common.userNamePlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        class="-enter-x"
        field="username"
        hide-label
      >
        <AInput
          v-model="userInfo.username"
          :placeholder="t('sys.login.common.userNamePlaceholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </AInput>
      </AFormItem>
      <AFormItem
        :rules="[
          {
            required: true,
            message: t('sys.login.common.passwordPlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        class="-enter-x"
        field="password"
        hide-label
      >
        <AInputPassword
          v-model="userInfo.password"
          :placeholder="t('sys.login.common.passwordPlaceholder')"
          allow-clear
          autocomplete="off"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </AInputPassword>
      </AFormItem>
      <ASpace :size="16" class="-enter-x" direction="vertical">
        <div class="flex justify-between -enter-x">
          <ACheckbox
            :model-value="loginConfig.rememberPassword"
            checked="rememberPassword"
            @change="setRememberPassword"
          >
            {{ t('sys.login.pwdLogin.rememberMe') }}
          </ACheckbox>
          <ALink @click="toLoginModule('forget-pwd')">
            {{ t('sys.login.pwdLogin.forgetPwd') }}
          </ALink>
        </div>
        <AButton
          :loading="loading"
          class="-enter-x"
          html-type="submit"
          long
          type="primary"
        >
          {{ t('sys.login.common.login') }}
        </AButton>
        <div class="flex w-full -enter-x">
          <AButton
            class="!text-[var(--color-text-3)]"
            long
            type="text"
            @click="toLoginModule('code-login')"
          >
            {{ t('sys.login.pwdLogin.mobileLogin') }}
          </AButton>
          <AButton
            class="!text-[var(--color-text-3)]"
            long
            type="text"
            @click="toLoginModule('register')"
          >
            {{ t('sys.login.pwdLogin.register') }}
          </AButton>
        </div>
        <ADivider class="-enter-x" orientation="center">
          {{ t('sys.login.pwdLogin.otherLoginMode') }}
        </ADivider>
        <div class="w-full flex justify-evenly -enter-x">
          <IconGithub
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
            @click="open(GITHUB_AUTHORIZE_URL)"
          />
          <IconWechat
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
          />
          <IconQqCircleFill
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
          />
          <IconAlipayCircle
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
          />
          <IconGoogleCircleFill
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
          />
          <IconFaceBookCircleFill
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
          />
        </div>
      </ASpace>
    </AForm>
  </div>
</template>

<style lang="less" scoped>
  :deep(.arco-divider-text) {
    background: transparent;
  }
</style>
