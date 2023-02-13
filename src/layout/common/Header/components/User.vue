<template>
  <a-dropdown trigger="hover" @select="handleDropdown" class="user">
    <template #content>
      <a-doption v-for="item in options" :value="item.key" :key="item.key">
        {{ item.label }}
        <template #icon>
          <component :is="item.icon" />
        </template>
      </a-doption>
    </template>
    <hover-container class="px-12px" :inverted="theme.header.inverted">
      <a-avatar :size="30">
        <img
          alt="avatar"
          src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
        />
      </a-avatar>
      <span class="pl-8px text-16px font-medium username">{{ auth.userInfo.userName }}</span>
    </hover-container>
  </a-dropdown>
</template>

<script lang="ts" setup>
  import { Modal } from '@arco-design/web-vue';
  import { useAuthStore, useThemeStore } from '@/store';
  import { iconifyRender } from '@/utils/common/icon';

  interface UserOptions {
    label: string;
    key: string;
    icon: any;
  }
  const theme = useThemeStore();
  const auth = useAuthStore();

  const options: Array<UserOptions> = [
    {
      label: '用户中心',
      key: 'user-center',
      icon: iconifyRender('carbon:user-avatar'),
    },
    {
      label: '退出登录',
      key: 'logout',
      icon: iconifyRender('carbon:logout'),
    },
  ];

  function handleDropdown(optionKey: string) {
    if (optionKey === 'logout') {
      Modal.info({
        title: '提示',
        content: '您确定要退出登录吗？',
        okText: '确定',
        cancelText: '取消',
        closable: true, // 显示关闭按钮
        draggable: true, // 可拖动
        hideCancel: false, // 取消隐藏取消按钮
        escToClose: true, // ESC 关闭
        // simple: false, // 关闭简单模式
        onOk: () => {
          auth.resetAuthStore();
        },
      });
    }
  }
</script>

<style lang="less" scoped>
  .username {
    color: var(--color-text-2);
  }
</style>
