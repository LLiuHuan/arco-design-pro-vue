<template>
  <a-spin :loading="messageLoading" style="width: 100%">
    <a-tabs type="rounded" default-active-key="message" destroyOnHide>
      <a-tab-pane v-for="tab in tabList" :key="tab.key">
        <!-- TODO: 动态图标太费劲了 先对着显示吧 后期会改成 symbol 或者使用h函数  -->
        <template #title>
          <icon-message v-if="tab.titleIcon === 'icon-message'" />
          <icon-customer-service v-else-if="tab.titleIcon === 'icon-customer-service'" />
          <icon-file v-else-if="tab.titleIcon === 'icon-file'" />
          {{ tab.title }} {{ tabListCont(tab.key) ? '(' + tabListCont(tab.key) + ')' : `` }}
        </template>
        <MessageList :list="groupData && groupData[tab.key]" avatar="123" />
      </a-tab-pane>
    </a-tabs>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { useI18n } from 'vue-i18n';
  import { getMessageList } from '@/api/message/message-box';
  import { groupBy } from 'lodash-es';
  import { MessageListType } from '@/components/MessageBox/index';
  import MessageList from '@/components/MessageBox/list.vue';

  export default defineComponent({
    name: 'MessageContent',
    components: {
      MessageList,
    },
    setup() {
      const { t } = useI18n();
      const state = reactive({
        messageList: [],
        groupData: ref<{ [key: string]: MessageListType }>({}),
        messageLoading: true,
      });

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

      const fetchSourceData = async () => {
        state.messageList = await getMessageList({});
        state.groupData = groupBy(state.messageList, 'type');
        state.messageLoading = false;
      };

      const tabListCont = (key: string) => {
        const data = state.groupData[key] || [];
        return data.filter((item) => !item.status).length;
      };

      onBeforeMount(() => {
        fetchSourceData();
      });

      return {
        ...toRefs(state),
        tabList,
        tabListCont,
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
