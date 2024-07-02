<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div
      class="flex text-400px text-[rgba(var(--primary-6))] text-[rgba(var(--primary-6))]"
    >
      <SvgIcon
        v-if="type === '403'"
        class="w-full h-full"
        local-icon="no-permission"
      />
      <SvgIcon
        v-if="type === '404'"
        class="w-full h-full"
        local-icon="not-found"
      />
      <SvgIcon
        v-if="type === '500'"
        class="w-full h-full"
        local-icon="service-error"
      />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <AButton type="primary">回到首页</AButton>
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
