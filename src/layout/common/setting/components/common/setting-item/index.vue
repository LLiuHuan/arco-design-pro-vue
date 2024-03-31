<template>
  <div class="w-full flex-y-center justify-between">
    <div>
      <span class="pr-8px text-base_text">{{ label }}</span>
      <slot name="suffix"></slot>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts" setup>
  defineOptions({
    name: 'SettingItem',
  });

  interface Props {
    /**
     * @description Label
     */
    label: string;
  }

  defineProps<Props>();
</script>

<style lang="less" scoped></style>
