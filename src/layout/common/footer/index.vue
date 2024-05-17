<template>
  <ALayoutFooter
    class="h-full text-[var(--color-text-3)] flex-col flex-center text-center bg-[var(--color-bg-2)]"
  >
    <div v-if="getFooterHeight >= 48" class="my-8px">
      <IconGithub
        class="cursor-pointer !text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]"
        @click="openWindow(GITHUB_URL)"
      />
    </div>

    <div>Copyright &copy;{{ year }} Arco Design Pro</div>
  </ALayoutFooter>
</template>

<script lang="ts" setup>
  import { GITHUB_URL } from '@/settings';
  import { openWindow } from '@/utils/common';
  import { useFooterSetting } from '@/hooks/setting';
  import { dateUtil } from '@/utils/date';

  const year = dateUtil().year();

  const { getFooterHeight } = useFooterSetting();
</script>

<style lang="less" scoped></style>
