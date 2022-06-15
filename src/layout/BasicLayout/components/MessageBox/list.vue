<template>
  <a-list v-if="list" :bordered="false">
    <a-list-item
      v-for="(item, index) in list"
      :key="index"
      action-layout="vertical"
      :style="{ opacity: item.status ? 0.5 : 1 }"
      style="border-bottom: 1px solid var(--color-fill-3)"
    >
      <div style="cursor: pointer">
        <a-list-item-meta>
          <template #avatar>
            <a-avatar v-if="item.avatar" shape="circle">
              <img :src="item.avatar" />
            </a-avatar>
            <a-avatar v-else style="background-color: rgb(15, 198, 194)">
              <icon-github />
            </a-avatar>
          </template>
          <template #title>
            <a-space size="4">
              <span>{{ item.title }}</span>
              <a-typography-text type="secondary">{{ item.subTitle }}</a-typography-text>
            </a-space>
          </template>
          <template #description>
            <div>
              <div>{{ item.content }}</div>
              <a-typography-text type="secondary">{{ item.time }}</a-typography-text>
            </div>
          </template>
        </a-list-item-meta>
      </div>
    </a-list-item>
    <template #footer>
      <div v-if="list.length > 0" style="text-align: center">
        <a-button type="text"> {{ $t('messageBox.allRead') }}</a-button>
      </div>
    </template>
  </a-list>
  <a-empty v-else />
</template>

<script lang="ts">
  import { defineComponent, PropType } from 'vue';
  import { MessageListType } from '@/layout/BasicLayout/components/MessageBox/index';

  export default defineComponent({
    name: 'MessageList',
    props: {
      list: {
        type: Array as PropType<MessageListType>,
        default: null,
      },
    },
    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
