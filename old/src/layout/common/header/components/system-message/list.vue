<script lang="ts" setup>
  import { PropType } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { MessageListType, MessageRecord } from './types';

  const props = defineProps({
    renderList: {
      type: Array as PropType<MessageListType>,
      required: true,
    },
    // unreadCount: {
    //   type: Number,
    //   default: 0,
    // },
  });
  const emit = defineEmits(['itemClick']);

  const { t } = useI18n();

  const allRead = () => {
    emit('itemClick', [...props.renderList]);
  };

  const onItemClick = (item: MessageRecord) => {
    if (!item.status) {
      emit('itemClick', [item]);
    }
  };
  const showMax = 3;
</script>

<template>
  <AList :bordered="false">
    <AListItem
      v-for="item in renderList"
      :key="item.id"
      :style="{
        opacity: item.status ? 0.5 : 1,
      }"
      action-layout="vertical"
    >
      <template #extra>
        <ATag v-if="item.messageType === 0" color="gray">未开始</ATag>
        <ATag v-else-if="item.messageType === 1" color="green">已开通</ATag>
        <ATag v-else-if="item.messageType === 2" color="blue">进行中</ATag>
        <ATag v-else-if="item.messageType === 3" color="red">即将到期</ATag>
      </template>
      <div class="item-wrap" @click="onItemClick(item)">
        <AListItemMeta>
          <template v-if="item.avatar" #avatar>
            <AAvatar shape="circle">
              <img v-if="item.avatar" :src="item.avatar" alt="" />
              <icon-desktop v-else />
            </AAvatar>
          </template>
          <template #title>
            <ASpace :size="4">
              <span>{{ item.title }}</span>
              <ATypographyText type="secondary">
                {{ item.subTitle }}
              </ATypographyText>
            </ASpace>
          </template>
          <template #description>
            <div>
              <ATypographyParagraph
                :ellipsis="{
                  rows: 1,
                }"
              >
                {{ item.content }}
              </ATypographyParagraph>
              <ATypographyText v-if="item.type === 'message'" class="time-text">
                {{ item.time }}
              </ATypographyText>
            </div>
          </template>
        </AListItemMeta>
      </div>
    </AListItem>
    <template #footer>
      <ASpace
        :class="{ 'add-border-top': renderList.length < showMax }"
        :size="0"
        fill
      >
        <div class="footer-wrap">
          <ALink @click="allRead">{{ t('layout.header.msgAllRead') }}</ALink>
        </div>
        <div class="footer-wrap">
          <ALink>{{ t('layout.header.msgViewMore') }}</ALink>
        </div>
      </ASpace>
    </template>
    <div
      v-if="renderList.length && renderList.length < 3"
      :style="{ height: `${(showMax - renderList.length) * 86}px` }"
    ></div>
  </AList>
</template>

<style lang="less" scoped>
  :deep(.arco-list) {
    .arco-list-item {
      min-height: 86px;
      border-bottom: 1px solid rgb(var(--gray-3));
    }

    .arco-list-item-extra {
      position: absolute;
      right: 20px;
    }

    .arco-list-item-meta-content {
      flex: 1;
    }

    .item-wrap {
      cursor: pointer;
    }

    .time-text {
      font-size: 12px;
      color: rgb(var(--gray-6));
    }

    .arco-empty {
      display: none;
    }

    .arco-list-footer {
      padding: 0;
      height: 50px;
      line-height: 48px;
      border-top: none;

      .arco-space-item {
        width: 100%;
        border-right: 1px solid rgb(var(--gray-3));

        &:last-child {
          border-right: none;
        }
      }

      .add-border-top {
        border-top: 1px solid rgb(var(--gray-3));
      }
    }

    .footer-wrap {
      text-align: center;
    }

    .arco-typography {
      margin-bottom: 0;
    }

    .add-border {
      border-top: 1px solid rgb(var(--gray-3));
    }

    .arco-space-horizontal .arco-space-item {
      justify-content: center;
    }
  }
</style>
