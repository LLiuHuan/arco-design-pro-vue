<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';
  import { reactive, ref } from 'vue';
  import { useLoading } from '@adp/hooks';
  import { ValidatedError } from '@arco-design/web-vue';
  import { SvgIcon } from '@/components/Icon';
  import { CountButton } from '@/components/CountDown';
  import { StrengthMeter } from '@/components/StrengthMeter';
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginTitle from '../login-title/index.vue';

  const errorMessage = ref('');

  const { toLoginModule } = useGo();
  const { loading, startLoading, endLoading } = useLoading();
  const { t } = useI18n();

  interface LoginFormProps {
    account: string;
    password: string;
    confirmPassword: string;
    phone: string;
    code: string;
    policy: boolean;
  }

  const formData = reactive({
    account: '',
    password: '',
    confirmPassword: '',
    phone: '',
    code: '',
    policy: false,
  });

  const checkCode = async (code: string) => {
    // 校验验证码
    console.log(code);
  };

  const handleSubmit = async ({
    errors,
    values,
  }: {
    errors: Record<string, ValidatedError> | undefined;
    values: LoginFormProps;
  }) => {
    if (!errors) {
      if (!formData.policy) {
        errorMessage.value = t('sys.login.register.policyTip');
        return;
      }
      startLoading();
      try {
        console.log(values);
        // 登录逻辑
      } catch (err) {
        // 异常提示
        errorMessage.value = (err as Error).message;
        endLoading();
      }
    }
  };
</script>

<template>
  <div>
    <LoginTitle login-mode="register" />

    <div class="h-32px leading-32px text-[rgba(var(--red-6))]">
      {{ errorMessage }}
    </div>
    <AForm
      :model="formData"
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
        field="account"
        hide-label
      >
        <AInput
          v-model="formData.account"
          :placeholder="t('sys.login.common.userNamePlaceholder')"
        >
          <template #prefix>
            <SvgIcon icon="mdi:account-outline" size="16" />
          </template>
        </AInput>
      </AFormItem>
      <AFormItem
        :rules="[
          {
            required: true,
            message: t('sys.login.common.phonePlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        class="-enter-x"
        field="phone"
        hide-label
      >
        <AInput
          v-model="formData.phone"
          :placeholder="t('sys.login.common.phonePlaceholder')"
        >
          <template #prefix>
            <SvgIcon icon="heroicons:device-phone-mobile" size="16" />
          </template>
        </AInput>
      </AFormItem>
      <AFormItem
        :rules="[
          {
            required: true,
            message: t('sys.login.common.codePlaceholder'),
          },
        ]"
        :validate-trigger="['change', 'blur']"
        class="-enter-x"
        field="code"
        hide-label
      >
        <ASpace class="flex w-full">
          <AVerificationCode
            v-model="formData.code"
            class="flex-auto"
            @finish="checkCode"
          />

          <CountButton :value="formData.code" class="w-140px" type="primary" />
        </ASpace>
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
        <StrengthMeter
          v-model:value="formData.password"
          :placeholder="t('sys.login.common.passwordPlaceholder')"
        />
      </AFormItem>
      <AFormItem
        :rules="[
          {
            required: true,
            message: t('sys.login.common.confirmPasswordPlaceholder'),
          },
          {
            validator: (value: string, cb: any) => {
              if (value !== formData.password) {
                cb(t('sys.login.common.inconsistentPasswords'));
              } else {
                cb();
              }
            },
          },
        ]"
        :validate-trigger="['change', 'blur']"
        class="-enter-x"
        field="confirmPassword"
        hide-label
      >
        <AInputPassword
          v-model="formData.confirmPassword"
          :placeholder="t('sys.login.common.confirmPasswordPlaceholder')"
          allow-clear
          autocomplete="off"
        >
          <template #prefix>
            <icon-lock />
          </template>
        </AInputPassword>
      </AFormItem>
      <AFormItem class="-enter-x !m-0" field="policy" hide-label>
        <ACheckbox v-model="formData.policy">
          {{ t('sys.login.register.policy') }}
        </ACheckbox>
      </AFormItem>
      <AFormItem>
        <ASpace class="w-full" direction="vertical" fill>
          <AButton :loading="loading" html-type="submit" long type="primary">
            {{ t('sys.login.pwdLogin.register') }}
          </AButton>
          <AButton long @click="toLoginModule('pwd-login')">
            {{ t('sys.login.common.back') }}
          </AButton>
        </ASpace>
      </AFormItem>
    </AForm>
  </div>
</template>

<style lang="less" scoped></style>
