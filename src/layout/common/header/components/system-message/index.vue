<template>
  <APopover
    class="!p-0"
    trigger="click"
    position="bottom"
    :content-style="{ padding: 0 }"
  >
    <HoverContainer :tooltip-content="$t('layout.header.tooltipNotify')">
      <ABadge :count="unreadAllCount">
        <AButton type="text" class="!text-[var(--color-text-1)] !h-40px">
          <SvgIcon icon="carbon:notification" size="20" />
        </AButton>
      </ABadge>
    </HoverContainer>
    <template #content>
      <ASpin :loading="loading">
        <ATabs
          v-model:active-key="messageType"
          default-active-key="2"
          :class="[getIsMobile ? 'w-276px' : 'w-360px']"
        >
          <template #extra>
            <AButton type="text" @click="emptyList">
              {{ $t('layout.header.msgTabBtn') }}
            </AButton>
          </template>
          <ATabPane v-for="item in tabList" :key="item.key">
            <template #title>
              <span>{{ item.title }} {{ formatUnreadLength(item.key) }}</span>
            </template>
            <a-result v-if="!renderList.length" status="404">
              <template #subtitle>
                {{ $t('layout.header.msgNoContent') }}
              </template>
            </a-result>
            <List
              :render-list="renderList"
              :unread-count="unreadCount"
              @item-click="handleItemClick"
            />
          </ATabPane>
        </ATabs>
      </ASpin>
    </template>
  </APopover>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { SvgIcon } from '@/components/Icon';
  import { useRootSetting } from '@/hooks/setting';
  import { computed, reactive, ref, toRefs } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLoading } from '@adp/hooks';
  import { MessageListType, MessageRecord, TabItem } from './types';
  import List from './list.vue';

  const { loading, startLoading, endLoading } = useLoading();
  const { getIsMobile } = useRootSetting();
  const { t } = useI18n();

  const messageType = ref('message');
  const haveReadIds: number[] = [];
  const messageData = reactive<{
    renderList: MessageRecord[];
    messageList: MessageRecord[];
  }>({
    renderList: [],
    messageList: [],
  });
  toRefs(messageData);
  const tabList: TabItem[] = [
    {
      key: 'message',
      title: t('layout.header.msgTabMessage'),
    },
    {
      key: 'notice',
      title: t('layout.header.msgTabNotice'),
    },
    {
      key: 'todo',
      title: t('layout.header.msgTabTodo'),
    },
  ];

  const getMessageList = (): MessageRecord[] => {
    return [
      {
        id: 1,
        type: 'message',
        title: '郑曦月',
        subTitle: '的私信',
        avatar:
          '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/8361eeb82904210b4f55fab888fe8416.png~tplv-uwbnlip3yd-webp.webp',
        content: '审批请求已发送，请查收',
        time: '今天 12:30:01',
      },
      {
        id: 2,
        type: 'message',
        title: '宁波',
        subTitle: '的回复',
        avatar:
          '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        content: '此处 bug 已经修复',
        time: '今天 12:30:01',
      },
      {
        id: 3,
        type: 'message',
        title: '宁波',
        subTitle: '的回复',
        avatar:
          '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
        content: '此处 bug 已经修复',
        time: '今天 12:20:01',
      },
      {
        id: 4,
        type: 'notice',
        title: '续费通知',
        subTitle: '',
        avatar: '',
        content: '您的产品使用期限即将截止，如需继续使用产品请前往购…',
        time: '今天 12:20:01',
        messageType: 3,
      },
      {
        id: 5,
        type: 'notice',
        title: '规则开通成功',
        subTitle: '',
        avatar: '',
        content: '内容屏蔽规则于 2021-12-01 开通成功并生效',
        time: '今天 12:20:01',
        messageType: 1,
      },
      {
        id: 6,
        type: 'todo',
        title: '质检队列变更',
        subTitle: '',
        avatar: '',
        content: '内容质检队列于 2021-12-01 19:50:23 进行变更，请重新…',
        time: '今天 12:20:01',
        messageType: 0,
      },
    ].map((item) => ({
      ...item,
      status: haveReadIds.indexOf(item.id) === -1 ? 0 : 1,
    }));
  };

  async function fetchSourceData() {
    startLoading();
    try {
      messageData.messageList = getMessageList();
    } catch (err) {
      // you can report use errorHandler or other
    } finally {
      endLoading();
    }
  }

  const renderList = computed(() => {
    return messageData.messageList.filter(
      (item) => messageType.value === item.type,
    );
  });

  async function readMessage(data: MessageListType) {
    const ids = data.map((item) => item.id);
    haveReadIds.push(...(ids || []));
    fetchSourceData();
  }

  const unreadCount = computed(() => {
    return renderList.value.filter((item) => !item.status).length;
  });

  const unreadAllCount = computed(() => {
    return messageData.messageList.filter((item) => !item.status).length;
  });

  const getUnreadList = (type: string) => {
    return messageData.messageList.filter(
      (item) => item.type === type && !item.status,
    );
  };

  const formatUnreadLength = (type: string) => {
    const list = getUnreadList(type);
    return list.length ? `(${list.length})` : ``;
  };

  const handleItemClick = (items: MessageListType) => {
    if (renderList.value.length) readMessage([...items]);
  };

  const emptyList = () => {
    messageData.messageList = [];
  };

  fetchSourceData();
</script>

<style lang="less" scoped>
  :deep(.arco-popover-popup-content) {
    padding: 0;
  }

  :deep(.arco-list-item-meta) {
    align-items: flex-start;
  }

  //:deep(.arco-tabs-nav) {
  //  padding: 14px 0 12px 16px;
  //  border-bottom: 1px solid var(--color-neutral-3);
  //}

  :deep(.arco-tabs-content) {
    padding-top: 0;

    .arco-result-subtitle {
      color: rgb(var(--gray-6));
    }
  }
</style>
