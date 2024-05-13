<template>
  <AModal :visible="visible" :footer="false" draggable @cancel="handleClose">
    <template #title>
      <span>{{ $t('layout.header.lockScreen') }}</span>
    </template>
    <div class="flex-col-center h-full px-20px">
      <div>
        <AAvatar
          class="mb-4"
          :size="80"
          :image-url="getUserInfo.avatar"
        ></AAvatar>
        <p class="text-center m-0 pb-20px">{{ getUserInfo.userName }}</p>
      </div>
      <AForm
        ref="formRef"
        class="w-300px"
        :model="lockForm"
        label-placement="top"
        label-width="0"
        @submit="handleLockScreen"
      >
        <AFormItem
          field="password"
          :label="$t('layout.header.lockScreenPassword')"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]"
          :validate-trigger="['change', 'input']"
        >
          <AInputPassword
            v-model="lockForm.password"
            type="password"
            placeholder="请输入密码"
            size="large"
            allow-clear
            autocomplete="off"
          />
        </AFormItem>
        <AButton
          type="primary"
          class="w-full"
          size="large"
          :loading="loading"
          html-type="submit"
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
