<template>
  <a-spin :loading="false" style="width: 100%">
    <a-tabs type="rounded" default-active-key="message" destroyOnHide>
      <a-tab-pane v-for="tab in tabList" :key="tab.key">
        <!-- TODO: 动态图标太费劲了 先对着显示吧 后期会改成 symbol  -->
        <template #title>
          <icon-message v-if="tab.titleIcon === 'icon-message'" />
          <icon-customer-service v-else-if="tab.titleIcon === 'icon-customer-service'" />
          <icon-file v-else-if="tab.titleIcon === 'icon-file'" />
          {{ tab.title }} (2)
        </template>
        {{ tab.key }}
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { useI18n } from 'vue-i18n';
  export default defineComponent({
    name: 'DropContent',
    setup() {
      const { t } = useI18n();

      const tabList = [
        {
          key: 'message',
          title: t(`messageBox.tab.title.message`),
          titleIcon: 'icon-message',
        },
        {
          key: 'notice',
          title: t(`messageBox.tab.title.notice`),
          titleIcon: 'icon-customer-service',
        },
        {
          key: 'approve',
          title: t(`messageBox.tab.title.approve`),
          titleIcon: 'icon-file',
          avatar: '',
        },
      ];
      return {
        tabList,
      };
    },
  });
</script>

<style lang="less" scoped>
  :deep(.arco-tabs-nav-tab) {
    justify-content: center;
    align-items: center;
  }
</style>
