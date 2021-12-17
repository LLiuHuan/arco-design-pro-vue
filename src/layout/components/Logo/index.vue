<template>
  <a-space :size="8" class="logo">
    <img src="~@/assets/logo.png" alt="" />
    <a-typography-title class="title" :heading="5">Arco Design Pro</a-typography-title>
  </a-space>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'Logo',
    setup() {
      return {
        collapsed: false,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';
</style>
