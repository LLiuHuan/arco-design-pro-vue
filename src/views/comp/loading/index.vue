<template>
  <PageWrapper
    v-loading="loadingRef"
    loading-tip="加载中..."
    title="Loading组件示例"
  >
    <ACard ref="wrapEl" class="m-4">
      <AAlert :show-icon="false">组件方式</AAlert>

      <AButton class="my-4 mr-4" type="primary" @click="openCompFullLoading">
        全屏 Loading
      </AButton>
      <AButton class="my-4" type="primary" @click="openCompAbsolute">
        容器内 Loading
      </AButton>
      <AppLoading
        :absolute="compState.absolute"
        :loading="compState.loading"
        :tip="compState.tip"
      />

      <AAlert :show-icon="false">函数方式</AAlert>

      <AButton class="my-4 mr-4" type="primary" @click="openFnFullLoading">
        全屏 Loading
      </AButton>
      <AButton class="my-4" type="primary" @click="openFnWrapLoading">
        容器内 Loading
      </AButton>

      <AAlert :show-icon="false">指令方式</AAlert>

      <AButton class="my-4 mr-4" type="primary" @click="openDirectiveLoading">
        打开指令Loading
      </AButton>
    </ACard>
  </PageWrapper>
</template>

<script lang="ts" setup>
  import { PageWrapper } from '@/components/PageWrapper';
  import { AppLoading, useLoading } from '@/components/AppLoading';
  import { reactive, ref } from 'vue';

  const wrapEl = ref(null);

  const loadingRef = ref(false);

  const compState = reactive<{
    loading?: boolean;
    tip?: string;
    absolute?: boolean;
  }>({
    loading: false,
    tip: '加载中...',
  });

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });

  const [openWrapLoading, closeWrapLoading] = useLoading({
    target: wrapEl,
    props: {
      tip: '加载中...',
      absolute: true,
    },
  });

  function openLoading(absolute: boolean) {
    compState.absolute = absolute;
    compState.loading = true;
    setTimeout(() => {
      compState.loading = false;
    }, 2000);
  }

  function openCompFullLoading() {
    openLoading(false);
  }

  function openCompAbsolute() {
    openLoading(true);
  }

  function openFnFullLoading() {
    openFullLoading();

    setTimeout(() => {
      closeFullLoading();
    }, 2000);
  }

  function openFnWrapLoading() {
    openWrapLoading();

    setTimeout(() => {
      closeWrapLoading();
    }, 2000);
  }

  function openDirectiveLoading() {
    loadingRef.value = true;
    setTimeout(() => {
      loadingRef.value = false;
    }, 2000);
  }
</script>

<style lang="less" scoped></style>
