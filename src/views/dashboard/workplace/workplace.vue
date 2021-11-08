<template>
  <h1>1234</h1>
  <a-button @click="() => $notification.info({ content: 'This is an info message!' })"
    >Top Right Message</a-button
  >
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'WorkPlace',
    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
