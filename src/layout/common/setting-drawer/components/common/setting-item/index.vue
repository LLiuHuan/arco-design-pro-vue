<script lang="ts" setup>
  interface Props {
    /**
     * @description Label
     */
    label: string;
  }

  defineOptions({
    name: 'SettingItem',
  });

  defineProps<Props>();
</script>

<template>
  <div class="hover:bg-[--color-fill-1] transition">
    <div class="w-full flex-y-center justify-between p-2">
      <div>
        <span class="pr-8px text-base_text">{{ label }}</span>
        <slot name="suffix"></slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
