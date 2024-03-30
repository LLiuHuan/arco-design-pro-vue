<script setup lang="ts">
  import { subscribeStore } from '@/store/subscribe';
  import { useLocaleStoreWithOut } from '@/store/modules/locale';

  const localeStore = useLocaleStoreWithOut();

  subscribeStore();
</script>

<template>
  <a-config-provider :locale="localeStore.localInfo?.arcoLang">
    <RouterView />
  </a-config-provider>
</template>

<style scoped></style>
