<template>
  <a-layout-footer
    ref="footerRef"
    class="text-[var(--color-text-3)] flex-col text-center bg-[var(--color-bg-2)] transition-base"
    :style="{ height: `${getFooterHeight}px` }"
  >
    <div class="my-8px">
      <IconGithub
        class="cursor-pointer !text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]"
        @click="openWindow(GITHUB_URL)"
      />
    </div>

    <div>Copyright &copy;{{ year }} Arco Design Pro</div>
  </a-layout-footer>
</template>

<script lang="ts" setup>
  import { GITHUB_URL } from '@/settings';
  import { openWindow } from '@/utils/common';
  import { useFooterSetting } from '@/hooks/setting';

  const date = new Date();
  const year = date.getFullYear();

  const { getFooterHeight } = useFooterSetting();
</script>

<style lang="less" scoped></style>
