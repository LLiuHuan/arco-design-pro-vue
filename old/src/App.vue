<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-07 18:52:02
 * @LastEditTime: 2024-08-26 15:45:30
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed } from 'vue';
  import { arcoLocales } from '@/locale/arco';
  import { useLocaleStore } from '@/store/modules/locale';
  import { useRootSetting } from '@/hooks/setting';
  import { useTitle } from '@/hooks/web/useTitle';

  const localeStore = useLocaleStore();

  const { getShowWatermark, getWatermarkText, getGrayMode } = useRootSetting();

  const arcoLocale = computed(() => {
    return arcoLocales[localeStore.localeInfo.locale];
  });

  useTitle();
</script>

<template>
  <AConfigProvider :locale="arcoLocale">
    <AWatermark
      :content="getShowWatermark ? getWatermarkText.split(/[,，]/) : ''"
      :grayscale="getGrayMode"
      :z-index="5200"
      class="wh-full bg-[var(--color-fill-1)]"
    >
      <RouterView />
    </AWatermark>
  </AConfigProvider>
</template>

<style scoped></style>
