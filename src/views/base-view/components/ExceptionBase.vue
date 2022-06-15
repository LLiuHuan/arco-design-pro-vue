<template>
  <div class="flex-col-center wh-full">
    <div class="text-400px text-primary">
      <icon-custom-no-permission v-if="props.type === '403'" />
      <icon-custom-not-found v-if="props.type === '404'" />
      <icon-custom-service-error v-if="props.type === '500'" />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <a-button type="primary">回到首页</a-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  import { routeName } from '@/router';

  type ExceptionType = '403' | '404' | '500';

  interface Props {
    /** 异常类型 403 404 500 */
    type: ExceptionType;
  }

  const props = defineProps<Props>();

  const routeHomePath = routeName('root');
</script>
<style scoped></style>
