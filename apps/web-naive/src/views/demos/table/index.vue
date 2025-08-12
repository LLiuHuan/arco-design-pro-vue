<!--
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-08-05 09:29:11
 * @LastEditors: LLiuHuan
-->
<script setup lang="ts">
import { ref } from 'vue';

import { ArcoButton, confirm, Page, useArcoModal } from '@arco/common-ui';

import { NButton, NDataTable } from 'naive-ui';

const columns = ref([
  {
    key: 'no',
    title: 'No',
  },
  {
    key: 'title',
    title: 'Title',
  },
  {
    key: 'length',
    title: 'Length',
  },
]);
const data = [
  { length: '4:18', no: 3, title: 'Wonderwall' },
  { length: '4:48', no: 4, title: "Don't Look Back in Anger" },
  { length: '7:27', no: 12, title: 'Champagne Supernova' },
];

function showIconConfirm() {
  confirm({
    content: NButton,
    icon: 'success',
  });
}
const [Modal, modalApi] = useArcoModal();
</script>

<template>
  <Page
    description="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。"
    title="NDataTable"
  >
    <ArcoButton @click="() => modalApi.open()">Open</ArcoButton>
    <Modal class="w-[600px]" title="基础示例"> modal content </Modal>
    <ArcoButton @click="showIconConfirm()"> aaa </ArcoButton>
    <NDataTable :columns="columns" :data="data" />
  </Page>
</template>

<style scoped></style>
