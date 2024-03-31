<template>
  <ASwitch :model-value="modelValue" @change="change">
    <template #checked-icon>
      <icon-check />
    </template>
    <template #unchecked-icon>
      <icon-close />
    </template>
  </ASwitch>
</template>

<script lang="ts" setup>
  interface Props {
    modelValue: any;
    change: any;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
