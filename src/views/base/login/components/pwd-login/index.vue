<template>
  {{ name }}
  <a-button @click="toLoginModule('register')">注册</a-button>
</template>

<script lang="ts" setup>
  import { useRouterPush } from '@/hooks/component';

  const name = 'pwd-login';
  const { toLoginModule } = useRouterPush();
</script>

<style lang="less" scoped></style>
