<template>
  <a-card title="Tab Detail" :bordered="false" size="small" class="shadow-sm rounded-16px w-full">
    <a-space direction="vertical" :size="12">
      <div>当前路由的描述数据(meta)：</div>
      <div>{{ route.meta }}</div>
      <a-button @click="handleToTab">返回Tab</a-button>
    </a-space>
  </a-card>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { routeName } from '@/router';
  import { useRouterPush } from '@/composables';

  const { routerPush } = useRouterPush();

  const route = useRoute();

  function handleToTab() {
    routerPush({ name: routeName('function_tab') });
  }
</script>

<style scoped></style>
