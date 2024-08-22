<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-26 01:37:21
 * @LastEditTime: 2024-08-22 13:45:28
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';

  const table = useTableContext();

  const { t } = useI18n();

  const redo = () => {
    table.reload();
  };
</script>

<template>
  <ATooltip :content="t('common.redo')" position="top">
    <div class="cursor-pointer" @click="redo">
      <SvgIcon icon="uim:redo" size="20" />
    </div>
  </ATooltip>
</template>

<style lang="less" scoped></style>
