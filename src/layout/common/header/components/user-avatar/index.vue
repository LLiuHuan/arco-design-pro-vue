<template>
  <ADropdown @select="handleDropdown">
    <HoverContainer class="px-10px">
      <div class="!h-40px flex-center">
        <AAvatar :image-url="getUser.avatar" :size="24"></AAvatar>
        <span class="pl-8px text-16px text-[var(--color-text-2)]">
          {{ getUser.userName }}
        </span>
      </div>
    </HoverContainer>

    <template #content>
      <template v-for="item in options" :key="item.key">
        <ADivider v-if="item.key === 'divider'" class="!m-0"></ADivider>
        <ADoption v-else :value="item.key">
          <template v-if="item.icon" #icon>
            <component :is="item.icon" />
          </template>
          {{ $t(`${item.label}`) }}
        </ADoption>
      </template>
    </template>
  </ADropdown>

  <Lock :visible="lockVisible" @cancel="lockVisible = false" />
</template>

<script lang="ts" setup>
  import { computed, h, ref, unref, VNode } from 'vue';
  import { iconRender } from '@/utils/common';
  import { HoverContainer } from '@/components/HoverContainer';
  import { useAuthStore, useAuthStoreWithOut } from '@/store/modules/auth';
  import userAvatar from '@/assets/images/userAvatar.jpg';
  import { useGo } from '@/hooks/web/usePage';
  import { Modal } from '@arco-design/web-vue';
  import { SvgIcon } from '@/components/Icon';
  import { useRootSetting } from '@/hooks/setting';
  import Lock from '../lock/index.vue';

  interface DropdownOption {
    key: string;
    label?: string;
    icon?: () => VNode;
  }

  const { goKey } = useGo();
  // const auth = useAuth();
  const { getIsMobile } = useRootSetting();
  const { logout } = useAuthStore();

  const lockVisible = ref(false);

  const options: DropdownOption[] = [
    {
      label: 'layout.header.userCenter',
      key: 'user-center',
      icon: iconRender({ icon: 'ph:user-circle', fontSize: 18 }),
    },
    {
      label: 'layout.header.tooltipLock',
      key: 'lock',
      icon: iconRender({ icon: 'ph:lock', fontSize: 18 }),
    },
    {
      key: 'divider',
    },
    {
      label: 'layout.header.logOut',
      key: 'logout',
      icon: iconRender({ icon: 'ph:sign-out', fontSize: 18 }),
    },
  ];

  const getUser = computed(() => {
    const { getUserInfo } = useAuthStoreWithOut();
    const { userName, avatar } = getUserInfo;

    return {
      userName: userName || '用户',
      avatar: avatar || userAvatar,
    };
  });

  const handleDropdown = (optionKey: 'user-center' | 'logout' | 'lock') => {
    switch (optionKey) {
      case 'logout':
        // handle logout
        Modal.open({
          title: () =>
            h('div', { class: 'flex justify-start items-center w-full' }, [
              h(SvgIcon, {
                icon: 'material-symbols:info',
                size: 24,
                color: '#faad14',
              }),
              h('span', { style: 'margin-left: 8px' }, ['温馨提示']),
            ]),
          content: '是否确认退出系统？',
          okText: '确认',
          okButtonProps: { size: 'small' },
          cancelText: '取消',
          cancelButtonProps: { size: 'small' },
          closable: true,
          simple: true,
          width: unref(getIsMobile) ? '90%' : 'auto',
          onOk() {
            logout();
          },
        });
        break;
      case 'lock':
        lockVisible.value = true;
        break;
      default:
        goKey(optionKey);
        break;
    }
  };
</script>

<style lang="less">
  :deep(.arco-trigger-popup .arco-divider-horizontal) {
    margin: 0;
  }
</style>
