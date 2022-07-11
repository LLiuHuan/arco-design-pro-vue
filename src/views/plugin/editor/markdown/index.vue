<template>
  <a-card title="vue-markdown-editor">
    <v-md-editor v-model="text" height="400px" />
    <template #actions>
      <github-link link="https://github.com/code-farmer-i/vue-markdown-editor" />
    </template>
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';

  const text = ref('');
</script>

<style lang="less" scoped></style>
