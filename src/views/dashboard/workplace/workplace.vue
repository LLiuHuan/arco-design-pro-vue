<template>
  <h1>1234</h1>
  <a-button @click="openNotification">Top Right Message</a-button>
  <div class="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4">
    <div class="flex-shrink-0">
      <img class="h-12 w-12" src="/img/logo.svg" alt="ChitChat Logo" />
    </div>
    <div>
      <div class="text-xl font-medium text-black">ChitChat</div>
      <p class="text-gray-500">You have a new message!</p>
    </div>
  </div>

  {{ $t('menu.lang') }}
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
