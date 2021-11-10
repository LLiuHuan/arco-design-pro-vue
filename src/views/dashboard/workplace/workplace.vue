<template>
  <h1>1234</h1>
  <a-button @click="openNotification">Top Right Message</a-button>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { Notification } from '@arco-design/web-vue';
  export default defineComponent({
    name: 'WorkPlace',
    setup() {
      const openNotification = () => {
        Notification.info({ content: 'This is an info message!' });
      };
      return {
        openNotification,
      };
    },
  });
</script>
