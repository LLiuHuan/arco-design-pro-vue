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
          :image-url="authStore.userInfo?.avatar"
          :size="80"
          class="mb-4"
        ></AAvatar>
        <p class="text-center m-0 pb-20px">{{
          authStore.userInfo?.userName
        }}</p>
      </div>
      <AForm
        ref="formRef"
        :layout="getIsMobile ? 'vertical' : 'horizontal'"
        :model="lockForm"
        auto-label-width
        class="!w-300px"
        @submit="handleLockScreen"
      >
        <AFormItem
          :label="$t('layout.header.lockScreenPassword')"
          :rules="[
            { required: true, message: $t('layout.header.lockPlaceholder') },
          ]"
          :validate-trigger="['change', 'input']"
          field="password"
        >
          <AInputPassword
            v-model="lockForm.password"
            :placeholder="$t('layout.header.lockPlaceholder')"
            allow-clear
            autocomplete="off"
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
  import { useLockStore } from '@/store/modules/lock';
  import { useRootSetting } from '@/hooks/setting';
  import { useAuthStore } from '@/store/modules/auth';

  interface Props {
    visible: boolean;
  }

  interface Emits {
    (event: 'cancel'): void;
  }

  defineProps<Props>();
  const emit = defineEmits<Emits>();
  const lockStore = useLockStore();

  const authStore = useAuthStore();
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
