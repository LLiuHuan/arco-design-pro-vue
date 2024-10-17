<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-08-07 18:52:02
 * @LastEditTime: 2024-10-16 17:51:22
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { computed, unref, watchEffect } from 'vue';
  import { useLoading } from '@adp/hooks';
  import { isFunction } from '@/utils/common';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useCountdown } from './useCountDown';

  defineOptions({ name: 'CountButton' });

  const props = withDefaults(defineProps<Props>(), {
    count: 60,
  });

  interface Props {
    value?: object | number | string | undefined;
    count?: number;
    beforeStartFunc?: () => Promise<boolean>;
  }

  const { t } = useI18n();
  const { loading, startLoading, endLoading } = useLoading();
  const { currentCount, isStart, start, reset } = useCountdown(props.count);

  const getButtonText = computed(() => {
    return !unref(isStart)
      ? t('component.countdown.normalText')
      : t('component.countdown.sendText', [unref(currentCount)]);
  });

  watchEffect(() => {
    props.value === undefined && reset();
  });

  async function handleStart() {
    const { beforeStartFunc } = props;
    if (beforeStartFunc && isFunction(beforeStartFunc)) {
      startLoading();
      try {
        const canStart = await beforeStartFunc();
        canStart && start();
      } finally {
        endLoading();
      }
    } else {
      start();
    }
  }
</script>

<template>
  <AButton
    :disabled="isStart"
    :loading="loading"
    v-bind="$attrs"
    @click="handleStart"
  >
    {{ getButtonText }}
  </AButton>
</template>

<style lang="less" scoped></style>
