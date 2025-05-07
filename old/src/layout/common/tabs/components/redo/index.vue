<template>
  <span
    class="w-36px h-full flex-center border-l-1 border-l-[var(--color-fill-2)] border-l-solid cursor-pointer text-[var(--color-neutral-6)] hover:text-[var(--color-text-1)]"
    @click="handleRedo"
  >
    <SvgIcon :spin="!getReloadFlag" icon="uim:redo" size="16"></SvgIcon>
  </span>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { useRootSetting } from '@/hooks/setting';

  const { getReloadFlag, refreshPage } = useRootSetting();
  const handleRedo = async () => {
    await refreshPage(500);
  };
</script>

<style lang="less" scoped></style>
