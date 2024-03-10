<script setup lang="ts">
  // import { ExceptionBase } from '@/components/Exception';

  import HelloWorld from '@/components/HelloWorld.vue';
  import { subscribeStore } from '@/store';

  // const locale = 'zh-cn';

  subscribeStore();
</script>

<template>
  <!--  <a-config-provider :locale="locale">-->
  <!--    <exception-base type="500"></exception-base>-->
  <!--    <AppProvider>-->
  <!--    <RouterView />-->
  <!--    </AppProvider>-->

  <HelloWorld msg="aaaa"></HelloWorld>
  <!--  </a-config-provider>-->
</template>

<style scoped></style>
