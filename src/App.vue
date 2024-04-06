<script setup lang="ts">
  import { subscribeStore } from '@/store/subscribe';
  import { computed } from 'vue';
  import { arcoLocales } from '@/locale/arco';
  import { useLocaleStoreWithOut } from '@/store/modules/locale';

  const localeStore = useLocaleStoreWithOut();

  const arcoLocale = computed(() => {
    return arcoLocales[localeStore.getLocale];
  });

  subscribeStore();
</script>

<template>
  <a-config-provider :locale="arcoLocale">
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
