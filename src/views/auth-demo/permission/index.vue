<template>
  <div class="h-full">
    <a-card title="权限切换" class="h-full shadow-sm rounded-16px">
      <div class="pb-12px">
        <span>当前用户的权限：{{ auth.userInfo.userRole }}</span>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { useAuthStore } from '@/store';

  const auth = useAuthStore();
</script>

<style lang="less" scoped></style>
