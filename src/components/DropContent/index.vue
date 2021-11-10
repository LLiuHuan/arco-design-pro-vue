<template>
  <a-spin :loading="false" style="width: 100%">
    <a-tabs type="rounded" default-active-key="message" destroyOnHide>
      <a-tab-pane v-for="tab in tabList" :key="tab.key" :title="tab.title + '(2)'">
        Content of Tab Panel 1
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'DropContent',
    setup() {
      const tabList = [
        {
          key: 'message',
          title: 'message',
          titleIcon: '',
        },
        {
          key: 'notice',
          title: 'notice',
          titleIcon: '',
        },
        {
          key: 'approve',
          title: 'approve',
          titleIcon: '',
          avatar: '',
        },
      ];
      return {
        tabList,
      };
    },
  });
</script>

<style lang="less" scoped></style>
