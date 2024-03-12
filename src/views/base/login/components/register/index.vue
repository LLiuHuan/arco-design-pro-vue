<template>
  {{ name }}
  <a-button @click="toLoginModule('pwd-login')">注册</a-button>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/hooks/component';

  const name = 'register';
  const { toLoginModule } = useRouterPush();
</script>

<style lang="less" scoped></style>
