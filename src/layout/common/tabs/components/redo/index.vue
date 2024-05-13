<template>
  <span
    class="w-36px h-full flex-center border-l-1 border-l-[var(--color-fill-2)] border-l-solid cursor-pointer text-[var(--color-neutral-6)] hover:text-[var(--color-text-1)]"
    @click="handleRedo"
  >
    <SvgIcon icon="uim:redo" size="16" :spin="!appStore.reloadFlag"></SvgIcon>
  </span>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useAppStoreWithOut } from '@/store/modules/app';

  const appStore = useAppStoreWithOut();
  const handleRedo = async () => {
    await appStore.refreshPage(500);
  };
</script>

<style lang="less" scoped></style>
