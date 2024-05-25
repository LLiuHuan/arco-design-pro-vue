<template>
  <ATooltip :content="$t('common.redo')" position="top">
    <div class="cursor-pointer" @click="redo">
      <SvgIcon icon="uim:redo" size="20"></SvgIcon>
    </div>
  </ATooltip>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useTableContext } from '../../hooks/useTableContext';

  const table = useTableContext();

  const redo = () => {
    table.reload();
  };
</script>

<style lang="less" scoped></style>
