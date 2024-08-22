<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { ValidatedError } from '@arco-design/web-vue';
  import { useGo } from '@/hooks/web/usePage';
  import { useLoading } from '@adp/hooks';
  import { CountButton } from '@/components/CountDown';
  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';
  import LoginTitle from '../login-title/index.vue';

  interface LoginFormProps {
    phone: string;
    code: string;
  }

  const formData = reactive({
    phone: '',
    code: '',
  });

  const errorMessage = ref('');
  const { loading, startLoading, endLoading } = useLoading();
  const { toLoginModule } = useGo();

  const { t } = useI18n();

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
      startLoading();

      try {
        console.log(values);
        // 登录逻辑
      } catch (err) {
        // 异常提示
        errorMessage.value = (err as Error).message;
      } finally {
        endLoading();
      }
    }
  };
</script>

<template>
  <div>
    <LoginTitle login-mode="code-login" />

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
          <!--          <AInput-->
          <!--            v-model="formData.code"-->
          <!--            :placeholder="t('sys.login.common.codePlaceholder')"-->
          <!--            allow-clear-->
          <!--            class="flex-auto"-->
          <!--          >-->
          <!--            <template #prefix>-->
          <!--              <SvgIcon-->
          <!--                icon="material-symbols:verified-user-outline"-->
          <!--                size="16"-->
          <!--              />-->
          <!--            </template>-->
          <!--          </AInput>-->
          <AVerificationCode
            v-model="formData.code"
            class="flex-auto"
            @finish="checkCode"
          />

          <CountButton :value="formData.code" class="w-140px" type="primary" />
        </ASpace>
      </AFormItem>
      <AFormItem>
        <ASpace class="w-full" direction="vertical" fill>
          <AButton :loading="loading" html-type="submit" long type="primary">
            {{ t('sys.login.common.login') }}
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
