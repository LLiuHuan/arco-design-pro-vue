<script lang="ts" setup>
import { useArcoModal } from '@arco/common-ui';

import { Button } from '@arco-design/web-vue';

import DragDemo from './drag-demo.vue';

const [Modal] = useArcoModal({
  destroyOnClose: true,
});
const [BaseModal, baseModalApi] = useArcoModal({
  connectedComponent: DragDemo,
});

function openNestedModal() {
  baseModalApi.open();
}
</script>
<template>
  <Modal title="嵌套弹窗示例">
    <Button @click="openNestedModal" type="primary">打开子弹窗</Button>
    <BaseModal />
  </Modal>
</template>
