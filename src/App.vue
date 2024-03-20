<script setup lang="ts">
  import { subscribeStore } from '@/store/subscribe';
  import { useLocaleStoreWithOut } from '@/store/modules/locale';
  import { AppProvider } from '@/components/Application';

  const localeStore = useLocaleStoreWithOut();

  subscribeStore();
</script>

<template>
  <a-config-provider :locale="localeStore.localInfo?.arcoLang">
    <app-provider>
      <RouterView />
    </app-provider>
  </a-config-provider>
</template>

<style scoped></style>
