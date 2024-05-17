<script lang="ts" setup>
import {subscribeStore} from '@/store/subscribe';
import {computed} from 'vue';
import {arcoLocales} from '@/locale/arco';
import {useLocaleStoreWithOut} from '@/store/modules/locale';
import {useRootSetting} from "@/hooks/setting";

const localeStore = useLocaleStoreWithOut();

const {
  getShowWatermark,
  getWatermarkText,
  getGrayMode,
} = useRootSetting();

const arcoLocale = computed(() => {
  return arcoLocales[localeStore.getLocale];
});

subscribeStore();
</script>

<template>
  <AConfigProvider :locale="arcoLocale">
    <AWatermark
        :content="getShowWatermark ? getWatermarkText.split(/[,，]/) : ''"
        :grayscale="getGrayMode"
        :z-index="520"
        class="wh-full bg-[var(--color-fill-1)]"
    >
      <RouterView/>
    </AWatermark>
  </AConfigProvider>
</template>

<style scoped></style>
