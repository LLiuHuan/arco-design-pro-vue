<template>
  <SiderTrigger v-if="sider"></SiderTrigger>
  <HeaderTrigger v-else></HeaderTrigger>
</template>

<script lang="ts" setup>
  import { SiderTrigger, HeaderTrigger } from './components';

  interface Props {
    sider?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    sider: true,
  });
</script>

<style lang="less" scoped></style>
