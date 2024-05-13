<template>
  <div>
    {{ name }}
    <AButton @click="toLoginModule('pwd-login')">注册</AButton>
  </div>
</template>

<script lang="ts" setup>
  import { useGo } from '@/hooks/web/usePage';

  const name = 'register';
  const { toLoginModule } = useGo();
</script>

<style lang="less" scoped></style>
