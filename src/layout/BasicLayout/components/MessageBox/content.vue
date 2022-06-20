<!--<template>-->
<!--  <a-spin :loading="messageLoading" style="width: 100%">-->
<!--    <a-tabs type="rounded" default-active-key="message" destroyOnHide>-->
<!--      <a-tab-pane v-for="(tab, index) in tabList" :key="index">-->
<!--        <template #title>-->
<!--          <component :is="tab.titleIcon" />-->
<!--          {{ tab.title }} {{ tabListCont(tab.key) ? '(' + tabListCont(tab.key) + ')' : `` }}-->
<!--        </template>-->
<!--        <MessageList :list="groupData && groupData[tab.key]" avatar="123" />-->
<!--      </a-tab-pane>-->
<!--    </a-tabs>-->
<!--  </a-spin>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';-->
<!--  import { useI18n } from 'vue-i18n';-->
<!--  import { groupBy } from 'lodash-es';-->
<!--  import { IconCustomerService, IconFile, IconMessage } from '@arco-design/web-vue/es/icon';-->
<!--  import { getMessageList } from '@/api/message';-->
<!--  import { MessageListType } from '@/layout/BasicLayout/components/MessageBox/index';-->
<!--  import MessageList from '@/layout/BasicLayout/components/MessageBox/list.vue';-->

<!--  export default defineComponent({-->
<!--    name: 'MessageContent',-->
<!--    components: {-->
<!--      MessageList,-->
<!--    },-->
<!--    setup() {-->
<!--      const { t } = useI18n();-->
<!--      const state = reactive({-->
<!--        messageList: [],-->
<!--        groupData: ref<{ [key: string]: MessageListType }>({}),-->
<!--        messageLoading: true,-->
<!--      });-->

<!--      const tabList = [-->
<!--        {-->
<!--          key: 'message',-->
<!--          title: t(`messageBox.tab.title.message`),-->
<!--          titleIcon: IconMessage,-->
<!--        },-->
<!--        {-->
<!--          key: 'notice',-->
<!--          title: t(`messageBox.tab.title.notice`),-->
<!--          titleIcon: IconCustomerService,-->
<!--        },-->
<!--        {-->
<!--          key: 'approve',-->
<!--          title: t(`messageBox.tab.title.approve`),-->
<!--          titleIcon: IconFile,-->
<!--          avatar: '',-->
<!--        },-->
<!--      ];-->

<!--      const fetchSourceData = async () => {-->
<!--        state.messageList = await getMessageList({});-->
<!--        state.groupData = groupBy(state.messageList, 'type');-->
<!--        state.messageLoading = false;-->
<!--      };-->

<!--      const tabListCont = (key: string) => {-->
<!--        const data = state.groupData[key] || [];-->
<!--        return data.filter((item) => !item.status).length;-->
<!--      };-->

<!--      onBeforeMount(() => {-->
<!--        fetchSourceData();-->
<!--      });-->

<!--      return {-->
<!--        ...toRefs(state),-->
<!--        tabList,-->
<!--        tabListCont,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  :deep(.arco-tabs-nav-tab) {-->
<!--    justify-content: center;-->
<!--    align-items: center;-->
<!--  }-->
<!--</style>-->
