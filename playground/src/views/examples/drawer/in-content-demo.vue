<script lang="ts" setup>
import { ref } from 'vue';

import { useArcoDrawer } from '@arco/common-ui';

import { Input, Message } from '@arco-design/web-vue';

import { useArcoForm } from '#/adapter/form';

const value = ref('');

const [Form] = useArcoForm({
  schema: [
    {
      component: 'Input',
      componentProps: {
        placeholder: 'KeepAlive测试：内部组件',
      },
      fieldName: 'field1',
      hideLabel: true,
      label: '字段1',
    },
  ],
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useArcoDrawer({
  destroyOnClose: false,
  onCancel() {
    drawerApi.close();
  },
  onConfirm() {
    Message.info('onConfirm');
    // drawerApi.close();
  },
});
</script>
<template>
  <Drawer append-to-main title="基础抽屉示例" title-tooltip="标题提示内容">
    <template #extra> extra </template>
    此弹窗指定在内容区域打开，并且在关闭之后弹窗内容不会被销毁
    <Input
      v-model:value="value"
      placeholder="KeepAlive测试:connectedComponent"
    />
    <Form />
  </Drawer>
</template>
