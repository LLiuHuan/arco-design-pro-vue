<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-23 00:05:47
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import type { QinFormSchema } from '@qin-core/form-ui';
import { useQinForm } from '@qin-core/form-ui';
import { QinButton } from '@qin-core/shadcn-ui';
import { computed, reactive } from 'vue';

import { $t } from '@qin/locales';
import type { Recordable } from '@qin/types';

interface Props {
  formSchema?: QinFormSchema[];
}

const props = withDefaults(defineProps<Props>(), {
  formSchema: () => [],
});

const emit = defineEmits<{
  submit: [Recordable<any>];
}>();

const [Form, formApi] = useQinForm(
  reactive({
    commonConfig: {
      labelWidth: 130,
      // 所有表单项
      componentProps: {
        class: 'w-full',
      },
    },
    layout: 'horizontal',
    schema: computed(() => props.formSchema),
    showDefaultActions: false,
  }),
);

async function handleSubmit() {
  const { valid } = await formApi.validate();
  const values = await formApi.getValues();
  if (valid) {
    emit('submit', values);
  }
}

defineExpose({
  getFormApi: () => formApi,
});
</script>
<template>
  <div>
    <Form />
    <QinButton type="submit" class="mt-4" @click="handleSubmit">
      {{ $t('profile.updatePassword') }}
    </QinButton>
  </div>
</template>
