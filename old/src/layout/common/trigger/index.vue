<script lang="ts" setup>
  import { HeaderTrigger, SiderTrigger } from './components';

  interface Props {
    sider?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    sider: true,
  });
</script>

<template>
  <SiderTrigger v-if="sider" />
  <HeaderTrigger v-else />
</template>

<style lang="less" scoped></style>
