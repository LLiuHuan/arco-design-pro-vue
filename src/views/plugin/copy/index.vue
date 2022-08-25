<template>
  <div class="h-full">
    <a-card title="文本复制" class="h-full shadow-sm rounded-16px">
      <a-input-search
        :style="{ width: '400px' }"
        placeholder="请输入要复制的内容吧"
        @search="handleCopy"
        search-button
      >
        <template #button-icon>
          <icon-copy />
        </template>
        <template #button-default> 复制 </template>
      </a-input-search>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { Message } from '@arco-design/web-vue';
  import { useClipboard } from '@vueuse/core';

  const { copy, isSupported } = useClipboard();

  function handleCopy(value: string) {
    if (!isSupported) {
      Message.error('您的浏览器不支持Clipboard API');
      return;
    }
    if (!value) {
      Message.error('请输入要复制的内容');
      return;
    }
    copy(value);
    Message.success(`复制成功：${value}`);
  }
</script>

<style lang="less" scoped></style>
