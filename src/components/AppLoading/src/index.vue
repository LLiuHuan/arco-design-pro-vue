<template>
  <div
    v-show="loading"
    :class="{
      'absolute top-0 left-0': absolute,
    }"
    :style="{ background: background }"
    class="wh-full fixed-center flex-col grid-cols-1 grid-rows-3 gap-y-30px z-105 bg-[var(--color-spin-layer-bg)]"
  >
    <AppLogo v-if="isShowLogo" :logo-size="50" :show-title="false" />

    <slot>
      <!--需要什么自己加-->
      <LoadingBasic />
    </slot>

    <h2
      v-if="isShowTitle && !tip"
      class="text-24px font-500 text-[rgba(var(--primary-6))]"
      >{{ VITE_GLOB_APP_TITLE }}</h2
    >
    <div v-else-if="tip" class="arco-spin-tip">
      {{ tip }}
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useGlobSetting } from '@/hooks/setting';
  import { AppLogo } from '@/components/AppLogo';
  import { LoadingBasic } from './components';

  console.log('loading');

  interface Props {
    isShowTitle?: boolean;
    isShowLogo?: boolean;
    tip?: string;
    loading?: boolean;
    background?: string;
    absolute?: boolean;
  }

  withDefaults(defineProps<Props>(), {
    isShowTitle: true,
    isShowLogo: false,
    loading: true,
  });

  const { VITE_GLOB_APP_TITLE } = useGlobSetting();
</script>

<style lang="less" scoped></style>
