<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-27 15:40:18
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  // import { routeName } from '@/router';

  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';

  type ExceptionType = '403' | '404' | '500' | 'offline';

  interface Props {
    /** 异常类型 403 404 500 */
    type: ExceptionType;
  }

  defineOptions({ name: 'ExceptionBase' });

  defineProps<Props>();

  const routeHomePath = 'root';

  const { t } = useI18n();
</script>

<template>
  <div class="flex-col-center gap-24px min-h-520px wh-full overflow-hidden">
    <div
      class="flex flex-col-center text-400px text-[rgba(var(--primary-6))] text-[rgba(var(--primary-6))]"
    >
      <SvgIcon
        v-if="type === '403'"
        class="w-full h-full"
        local-icon="no-permission"
      />
      <SvgIcon
        v-else-if="type === '404'"
        class="w-full h-full"
        local-icon="not-found"
      />
      <SvgIcon
        v-else-if="type === '500'"
        class="w-full h-full"
        local-icon="service-error"
      />
      <SvgIcon
        v-else-if="type === 'offline'"
        class="w-full h-full"
        local-icon="offline"
      />
    </div>
    <router-link :to="{ name: routeHomePath }">
      <AButton type="primary">{{ t('common.goHome') }}</AButton>
    </router-link>
  </div>
</template>

<style scoped></style>
