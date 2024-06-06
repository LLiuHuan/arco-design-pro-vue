<template>
  <AModal
    :footer="false"
    :visible="visible"
    :width="getIsMobile ? '90%' : 'auto'"
    draggable
    @cancel="handleClose"
  >
    <template #title>
      <span>{{ $t('layout.header.lockScreen') }}</span>
    </template>
    <div class="flex-col-center h-full px-20px">
      <div>
        <AAvatar
          :image-url="getUserInfo.avatar"
          :size="80"
          class="mb-4"
        ></AAvatar>
        <p class="text-center m-0 pb-20px">{{ getUserInfo.userName }}</p>
      </div>
      <AForm
        ref="formRef"
        :layout="getIsMobile ? 'vertical' : 'horizontal'"
        :model="lockForm"
        class="w-300px"
        label-placement="top"
        label-width="0"
        @submit="handleLockScreen"
      >
        <AFormItem
          :label="$t('layout.header.lockScreenPassword')"
          :rules="[{ required: true, message: '请输入密码' }]"
          :validate-trigger="['change', 'input']"
          field="password"
        >
          <AInputPassword
            v-model="lockForm.password"
            allow-clear
            autocomplete="off"
            placeholder="请输入密码"
            size="large"
            type="password"
          />
        </AFormItem>
        <AButton
          :loading="loading"
          class="w-full"
          html-type="submit"
          size="large"
          type="primary"
        >
          {{ $t('layout.header.lockScreen') }}
        </AButton>
      </AForm>
    </div>
  </AModal>
</template>

<script lang="ts" setup>
  import { useLoading } from '@adp/hooks';
  import { reactive } from 'vue';
  import { useAuthStoreWithOut } from '@/store/modules/auth';
  import { useLockStore } from '@/store/modules/lock';
  import { useRootSetting } from '@/hooks/setting';

  interface Props {
    visible: boolean;
  }

  interface Emits {
    (event: 'cancel'): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();
  const lockStore = useLockStore();

  const { getUserInfo } = useAuthStoreWithOut();
  const { loading, startLoading, endLoading } = useLoading();
  const { getIsMobile } = useRootSetting();

  const lockForm = reactive({
    password: '',
  });

  const handleClose = () => {
    lockForm.password = '';
    emit('cancel');
  };

  const handleLockScreen = async ({ errors }: any) => {
    if (errors) return;
    startLoading();

    lockStore.setLockInfo({
      isLock: true,
      pwd: lockForm.password,
    });

    endLoading();
    handleClose();
  };
</script>

<style lang="less" scoped></style>
