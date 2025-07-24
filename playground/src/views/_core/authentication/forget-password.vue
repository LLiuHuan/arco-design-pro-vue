<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-07-24 10:13:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { ArcoFormSchema } from '@arco/common-ui';
import type { Recordable } from '@arco/types';

import { computed, ref } from 'vue';

import { AuthenticationForgetPassword, z } from '@arco/common-ui';
import { $t } from '@arco/locales';

defineOptions({ name: 'ForgetPassword' });

const loading = ref(false);

const formSchema = computed((): ArcoFormSchema[] => {
  return [
    {
      component: 'ArcoInput',
      componentProps: {
        placeholder: 'example@example.com',
      },
      fieldName: 'email',
      label: $t('authentication.email'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.emailTip') })
        .email($t('authentication.emailValidErrorTip')),
    },
  ];
});

function handleSubmit(value: Recordable<any>) {
  loading.value = true;
  // eslint-disable-next-line no-console
  console.log('reset email:', value);
  setTimeout(() => {
    loading.value = false;
  }, 1000);
}
</script>

<template>
  <AuthenticationForgetPassword
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleSubmit"
  />
</template>
