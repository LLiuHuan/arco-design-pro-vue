<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 15:35:10
 * @LastEditTime: 2025-05-27 15:53:26
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
import type { ArcoFormSchema } from '@arco/common-ui';
import type { Recordable } from '@arco/types';

import { computed, ref } from 'vue';

import { AuthenticationCodeLogin, z } from '@arco/common-ui';
import { $t } from '@arco/locales';

defineOptions({ name: 'CodeLogin' });

const loading = ref(false);
const CODE_LENGTH = 6;

const formSchema = computed((): ArcoFormSchema[] => {
  return [
    {
      component: 'ArcoInput',
      componentProps: {
        placeholder: $t('authentication.mobile'),
      },
      fieldName: 'phoneNumber',
      label: $t('authentication.mobile'),
      rules: z
        .string()
        .min(1, { message: $t('authentication.mobileTip') })
        .refine((v) => /^\d{11}$/.test(v), {
          message: $t('authentication.mobileErrortip'),
        }),
    },
    {
      component: 'ArcoPinInput',
      componentProps: {
        codeLength: CODE_LENGTH,
        createText: (countdown: number) => {
          const text =
            countdown > 0
              ? $t('authentication.sendText', [countdown])
              : $t('authentication.sendCode');
          return text;
        },
        placeholder: $t('authentication.code'),
      },
      fieldName: 'code',
      label: $t('authentication.code'),
      rules: z.string().length(CODE_LENGTH, {
        message: $t('authentication.codeTip', [CODE_LENGTH]),
      }),
    },
  ];
});
/**
 * 异步处理登录操作
 * Asynchronously handle the login process
 * @param values 登录表单数据
 */
async function handleLogin(values: Recordable<any>) {
  // eslint-disable-next-line no-console
  console.log(values);
}
</script>

<template>
  <AuthenticationCodeLogin
    :form-schema="formSchema"
    :loading="loading"
    @submit="handleLogin"
  />
</template>
