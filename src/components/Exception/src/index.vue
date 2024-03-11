<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div class="flex text-400px text-primary">
      <SvgIcon
        v-if="type === '403'"
        local-icon="no-permission"
        class="w-full h-full"
      />
      <SvgIcon
        v-if="type === '404'"
        local-icon="not-found"
        class="w-full h-full"
      />
      <SvgIcon
        v-if="type === '500'"
        local-icon="service-error"
        class="w-full h-full"
      />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <a-button type="primary">回到首页</a-button>
    </router-link>
  </div>
</template>

<script lang="ts" setup>
  // import { routeName } from '@/router';

  import { SvgIcon } from '@/components/Icon';

  defineOptions({ name: 'ExceptionBase' });

  type ExceptionType = '403' | '404' | '500';

  interface Props {
    /** 异常类型 403 404 500 */
    type: ExceptionType;
  }

  defineProps<Props>();

  const routeHomePath = 'root';
</script>

<style scoped></style>
