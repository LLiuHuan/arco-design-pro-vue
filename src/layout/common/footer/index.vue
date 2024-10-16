<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 19:15:40
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { GITHUB_URL } from '@/settings';
  import { openWindow } from '@/utils/common';
  import { useFooterSetting, useCopyrightSetting } from '@/hooks/setting';
  import { dateUtil } from '@/utils/date';
  import police from '@/assets/images/police.png';
  import { Record } from './components';

  const year = dateUtil().year();

  const { getFooterHeight } = useFooterSetting();
  const {
    getCopyrightShow,
    getCompany,
    getCompanyLink,
    getPolice,
    getPoliceLink,
    getRecord,
    getRecordLink,
  } = useCopyrightSetting();
</script>

<template>
  <a-layout-footer
    class="h-full text-[var(--color-text-3)] flex-col flex-center text-center bg-[var(--color-bg-2)]"
  >
    <div v-if="getFooterHeight >= 48" class="my-8px">
      <IconGithub
        class="cursor-pointer !text-[var(--color-text-3)] hover:!text-[var(--color-text-1)]"
        @click="openWindow(GITHUB_URL)"
      />
    </div>

    <a-space v-if="getCopyrightShow">
      <Record :name="getPolice" :href="getPoliceLink" :logo="police" />

      <div>Copyright &copy;{{ year }} </div>
      <Record :name="getCompany" :href="getCompanyLink" />

      <Record :name="getRecord" :href="getRecordLink" />
    </a-space>
  </a-layout-footer>
</template>

<style lang="less" scoped></style>
