<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-17 03:03:56
 * @LastEditTime: 2024-08-22 13:44:40
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';

  defineOptions({
    name: 'LookForward',
  });

  const { t } = useI18n();
</script>

<template>
  <div
    class="size-full min-h-520px flex-col-center gap-24px overflow-hidden text-[rgba(var(--primary-6))]"
  >
    <div class="flex text-400px text-[rgba(var(--primary-6))]">
      <SvgIcon local-icon="coding" />
    </div>
    <slot>
      <h3 class="text-24px text-[rgba(var(--primary-6))] font-500">
        {{ t('common.lookForward') }}
      </h3>
    </slot>
  </div>
</template>

<style scoped></style>
