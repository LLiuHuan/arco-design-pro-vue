<template>
  <a-dropdown trigger="click" position="br">
    <div class="messageBoxTrigger">
      <a-badge :count="9" dot>
        <icon-notification />
      </a-badge>
    </div>
    <template #content>
      <div class="messageBox">
        <message-content />
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import MessageContent from '@/layout/BasicLayout/components/MessageBox/content.vue';

  export default defineComponent({
    name: 'MessageBox',
    components: {
      MessageContent,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';
</style>
