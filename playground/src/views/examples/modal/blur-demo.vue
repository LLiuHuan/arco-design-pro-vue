<script lang="ts" setup>
import { ref, watch } from 'vue';

import { useArcoModal } from '@arco/common-ui';

import { Slider } from '@arco-design/web-vue';

const blur = ref(5);
const [Modal, modalApi] = useArcoModal({
  overlayBlur: blur.value,
});
watch(blur, (val) => {
  modalApi.setState({
    overlayBlur: val,
  });
});
</script>
<template>
  <Modal title="遮罩层模糊">
    <p>调整滑块来改变遮罩层模糊程度：{{ blur }}</p>
    <Slider v-model:model-value="blur" :max="30" :min="0" />
  </Modal>
</template>
