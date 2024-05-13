<template>
  <ADropdown @select="handleDropdown">
    <HoverContainer class="px-10px">
      <div class="!h-40px flex-center">
        <AAvatar :size="24" :image-url="getUser.avatar"></AAvatar>
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
</template>

<script lang="ts" setup>
  import { computed, VNode } from 'vue';
  import { iconRender } from '@/utils/common';
  import { HoverContainer } from '@/components/HoverContainer';
  import { useAuthStoreWithOut } from '@/store/modules/auth';
  import userAvatar from '@/assets/images/userAvatar.jpg';
  import { useGo } from '@/hooks/web/usePage';
  import { useAuth } from '@/hooks/web/useAuth';

  interface DropdownOption {
    key: string;
    label?: string;
    icon?: () => VNode;
  }

  const { goKey } = useGo();
  const auth = useAuth();

  const options: DropdownOption[] = [
    {
      label: 'layout.header.userCenter',
      key: 'user-center',
      icon: iconRender({ icon: 'ph:user-circle', fontSize: 18 }),
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

  const handleDropdown = (optionKey: 'user-center' | 'logout') => {
    switch (optionKey) {
      case 'logout':
        // handle logout
        auth.logout();
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
