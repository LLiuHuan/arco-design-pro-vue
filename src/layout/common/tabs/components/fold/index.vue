<template>
  <span
    class="w-36px h-full flex-center border-l-1 border-l-[var(--color-fill-2)] border-l-solid cursor-pointer text-[var(--color-neutral-6)] hover:text-[var(--color-text-1)]"
    @click="handleFold"
  >
    <!--    <SvgIcon icon="codicon:screen-normal" :size="16"></SvgIcon>-->
    <SvgIcon :icon="getIcon" :size="16"></SvgIcon>
  </span>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { computed, unref } from 'vue';
  import { useHeaderSetting, useMenuSetting } from '@/hooks/setting';
  import { triggerWindowResize } from '@/utils/event';

  const { getShowMenu, setMenuSetting } = useMenuSetting();
  const { getShowHeader, setHeaderSetting } = useHeaderSetting();

  const getIsUnFold = computed(
    () => !unref(getShowMenu) && !unref(getShowHeader),
  );

  const getIcon = computed(() =>
    unref(getIsUnFold) ? 'codicon:screen-normal' : 'codicon:screen-full',
  );

  function handleFold() {
    const isUnFold = unref(getIsUnFold);
    setMenuSetting({ show: isUnFold });
    setHeaderSetting({ show: isUnFold });
    triggerWindowResize();
  }
</script>

<style lang="less" scoped></style>
