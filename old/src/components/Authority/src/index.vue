<template>
  <template v-if="!value || hasPermission(value)">
    <slot></slot>
  </template>
</template>

<script lang="ts" setup>
  import { usePermission } from '@/hooks/web/usePermission';
  import { RoleEnum } from '@/enums/authEnum';

  const { hasPermission } = usePermission();

  interface Props {
    value: RoleEnum | RoleEnum[] | string | string[];
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
