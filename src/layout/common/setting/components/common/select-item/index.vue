<template>
  <ASelect
    class="!w-126px"
    :model-value="modelValue"
    @change="change({ trigger: $event })"
  >
    <AOption v-for="item in options" :key="item.value" :value="item.value">{{
      $t(item.label)
    }}</AOption>
  </ASelect>
</template>

<script lang="ts" setup>
  interface Props {
    modelValue: any;
    change: any;
    options: any;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
