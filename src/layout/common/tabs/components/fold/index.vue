<template>
  <span
    class="w-36px h-full flex-center border-l-1 border-l-[var(--color-fill-2)] border-l-solid cursor-pointer text-[var(--color-neutral-6)] hover:text-[var(--color-text-1)]"
    @click="handleFold"
  >
    <SvgIcon :icon="getIcon" :size="16"></SvgIcon>
  </span>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { computed, unref } from 'vue';
  import { useFullContent } from '@/hooks/web/useFullContent';

  const { getFullContent, setFullContent } = useFullContent();

  const getIcon = computed(() =>
    unref(getFullContent) ? 'codicon:screen-normal' : 'codicon:screen-full',
  );

  function handleFold() {
    setFullContent(!unref(getFullContent));
  }
</script>

<style lang="less" scoped></style>
