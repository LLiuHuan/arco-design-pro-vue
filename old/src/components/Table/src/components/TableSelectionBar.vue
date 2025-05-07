<template>
  <AAlert>
    <span v-if="count > 0" class="leading-26px">
      {{ t('component.table.selectionBarTips', { count }) }}
    </span>
    <span v-else class="leading-26px">
      {{ t('component.table.selectionBarEmpty') }}
    </span>
    <AButton
      v-show="count > 0"
      class="!bg-transparent"
      size="mini"
      type="text"
      @click="clearSelectedRowKeys"
    >
      {{ t('component.table.selectionBarClear') }}
    </AButton>
  </AAlert>
</template>

<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { TableActionType } from '../types/table';

  interface Props {
    count?: number;
    clearSelectedRowKeys: TableActionType['clearSelectedRowKeys'];
  }

  withDefaults(defineProps<Props>(), {
    count: 0,
  });

  const { t } = useI18n();
</script>

<style lang="less" scoped></style>
