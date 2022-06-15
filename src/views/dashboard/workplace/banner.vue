<template>
  <a-row class="banner">
    <a-col :span="8">
      <a-typography-title :heading="5" style="margin-top: 0"> 欢迎</a-typography-title>
      <a-typography-text type="secondary"> 哈哈哈, 123456789@qq.com</a-typography-text>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';

  export default defineComponent({
    name: 'WorkplaceBanner',
    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
