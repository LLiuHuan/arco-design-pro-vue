<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 09:46:23
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { ArcoFormSchema } from '@arco/common-ui';
import type { BasicOption } from '@arco/types';

import { computed, markRaw } from 'vue';

import { AuthenticationLogin, SliderCaptcha, z } from '@arco/common-ui';
import { $t } from '@arco/locales';

import { useAuthStore } from '#/store';

defineOptions({ name: 'Login' });

const authStore = useAuthStore();

const MOCK_USER_OPTIONS: BasicOption[] = [
  {
    label: 'Super',
    value: 'super',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'User',
    value: 'jack',
  },
];

const formSchema = computed((): ArcoFormSchema[] => {
  return [
    {
      component: 'ArcoSelect',
      componentProps: {
        options: MOCK_USER_OPTIONS,
        placeholder: $t('authentication.selectAccount'),
      },
      fieldName: 'selectAccount',
      label: $t('authentication.selectAccount'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.selectAccount') })
        .optional()
        .default('super'),
    },
    {
      component: 'ArcoInput',
      componentProps: {
        placeholder: $t('authentication.usernameTip'),
      },
      dependencies: {
        trigger(values, form) {
          if (values.selectAccount) {
            const findUser = MOCK_USER_OPTIONS.find(
              (item) => item.value === values.selectAccount,
            );
            if (findUser) {
              form.setValues({
                password: '123456',
                username: findUser.value,
              });
            }
          }
        },
        triggerFields: ['selectAccount'],
      },
      fieldName: 'username',
      label: $t('authentication.username'),
      rules: z.string().min(1, { message: $t('authentication.usernameTip') }),
    },
    {
      component: 'ArcoInputPassword',
      componentProps: {
        placeholder: $t('authentication.password'),
      },
      fieldName: 'password',
      label: $t('authentication.password'),
      rules: z.string().min(1, { message: $t('authentication.passwordTip') }),
    },
    {
      component: markRaw(SliderCaptcha),
      fieldName: 'captcha',
      rules: z.boolean().refine((value) => value, {
        message: $t('authentication.verifyRequiredTip'),
      }),
    },
  ];
});
</script>

<template>
  <AuthenticationLogin
    :form-schema="formSchema"
    :loading="authStore.loginLoading"
    @submit="authStore.authLogin"
  />
</template>
