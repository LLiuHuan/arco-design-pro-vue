<template>
  <span
    class="w-36px h-full flex-center border-l-1 border-l-[var(--color-fill-2)] border-l-solid cursor-pointer text-[var(--color-neutral-6)] hover:text-[var(--color-text-1)]"
    @click="setSettingDrawerState(true)"
  >
    <SettingBtn :size="18" />
  </span>
</template>

<script lang="ts" setup>
  import SettingBtn from '@/layout/common/setting-btn/index.vue';
  import { useRootSetting } from '@/hooks/setting';

  const { setSettingDrawerState } = useRootSetting();
</script>

<style lang="less" scoped></style>
