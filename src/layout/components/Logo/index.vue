<template>
  <a-space :size="8" class="logo">
    <img src="~@/assets/logo.svg" alt="" />
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
  .logo {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 64px;
    line-height: 64px;
    overflow: hidden;
    white-space: nowrap;

    img {
      width: auto;
      height: 33px;
    }

    .title {
      margin: 0;
      font-size: 18px;
    }
  }
</style>
