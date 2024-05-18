<template>
  <div>
    <div>
      <AButton @click="fireVueError">点击出发Vue错误</AButton>
    </div>

    <ATable :columns="columns" :data="getErrorLogList" />
  </div>
</template>

<script lang="ts" setup>
  import { useErrorLog } from '@/hooks/web/useErrorLog';

  const { getErrorLogList } = useErrorLog();

  const columns = [
    {
      title: 'type',
      dataIndex: 'type',
    },
    {
      title: 'url',
      dataIndex: 'url',
    },
    {
      title: 'time',
      dataIndex: 'time',
    },
    {
      title: 'file',
      dataIndex: 'file',
    },
    {
      title: 'name',
      dataIndex: 'name',
    },
    {
      title: 'message',
      dataIndex: 'message',
    },
    {
      title: 'stack',
      dataIndex: 'stack',
    },
  ];

  function fireVueError() {
    throw new Error('fire vue error!');
  }
</script>

<style lang="less" scoped></style>
