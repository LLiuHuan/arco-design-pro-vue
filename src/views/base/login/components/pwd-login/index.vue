<template>
  <div class="w-320px">
    <div class="h-32px leading-32px text-[rgba(var(--red-6))]">{{
      errorMessage
    }}</div>
    <a-form
      ref="loginForm"
      :model="userInfo"
      layout="vertical"
      @submit="handleSubmit"
    >
      <a-form-item
        field="username"
        :rules="[
          {
            required: true,
            message: $t('sys.login.common.userNamePlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input
          v-model="userInfo.username"
          :placeholder="$t('sys.login.common.userNamePlaceholder')"
        >
          <template #prefix>
            <icon-user />
          </template>
        </a-input>
      </a-form-item>
      <a-form-item
        field="password"
        :rules="[
          {
            required: true,
            message: $t('sys.login.common.passwordPlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        hide-label
      >
        <a-input-password
          v-model="userInfo.password"
          :placeholder="$t('sys.login.common.passwordPlaceholder')"
          allow-clear
        >
          <template #prefix>
            <icon-lock />
          </template>
        </a-input-password>
      </a-form-item>
      <a-space :size="16" direction="vertical">
        <div class="flex justify-between">
          <a-checkbox
            checked="rememberPassword"
            :model-value="loginConfig.rememberPassword"
            @change="setRememberPassword"
          >
            {{ $t('sys.login.pwdLogin.rememberMe') }}
          </a-checkbox>
          <a-link @click="toLoginModule('forget-pwd')">{{
            $t('sys.login.pwdLogin.forgetPwd')
          }}</a-link>
        </div>
        <a-button type="primary" html-type="submit" long :loading="loading">
          {{ $t('sys.login.common.login') }}
        </a-button>
        <div class="flex w-full">
          <a-button type="text" long class="!text-[var(--color-text-3)]">
            {{ $t('sys.login.pwdLogin.mobileLogin') }}
          </a-button>
          <a-button
            type="text"
            long
            class="!text-[var(--color-text-3)]"
            @click="toLoginModule('register')"
          >
            {{ $t('sys.login.pwdLogin.register') }}
          </a-button>
        </div>
        <a-divider orientation="center">{{
          $t('sys.login.pwdLogin.otherLoginMode')
        }}</a-divider>
        <div class="w-full flex justify-evenly">
          <IconGithub
            class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
            size="24"
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
      </a-space>
    </a-form>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref, unref } from 'vue';
  import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
  import {
    IconGithub,
    IconWechat,
    IconQqCircleFill,
    IconAlipayCircle,
    IconGoogleCircleFill,
    IconFaceBookCircleFill,
  } from '@arco-design/web-vue/es/icon';
  import { useLoading } from '@/hooks/common';
  import { localStg } from '@/utils/cache';
  import { LOGIN_INFO } from '@/enums';
  import { useGo } from '@/hooks/web/usePage';
  import { useAuth } from '@/hooks/web/useAuth';

  const { toLoginModule } = useGo();

  interface LoginFormProps {
    username: string;
    password: string;
  }

  const errorMessage = ref('');
  const { loading, setLoading } = useLoading();

  const { login } = useAuth();

  // const loginConfig = {
  //   rememberPassword: true,
  //   username: 'Arco', // 演示默认值
  //   password: 'arco123', // demo default value
  // };

  const loginConfig = ref(
    localStg.get(LOGIN_INFO) || {
      rememberPassword: true,
      username: 'admin', // 演示默认值
      password: 'admin', // demo default value
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
      setLoading(true);
      try {
        await login(values.username, values.password);
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
        setLoading(false);
      }
    }
  };
  const setRememberPassword = (value: boolean) => {
    // 是否记住密码
    loginConfig.value.rememberPassword = value;
  };
</script>

<style lang="less" scoped>
  :deep(.arco-divider-text) {
    background: transparent;
  }
</style>
