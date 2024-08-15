<template>
  <ACard :bordered="false">
    <div class="whitespace-nowrap w-full p-16px">
      <div class="float-left h-100px w-120px">
        <AStatistic
          :title="title"
          :value="1024"
          :value-from="0"
          animation
          show-group-separator
        />
        <div class="desc">
          <ATypographyText class="pr-8px text-12px" type="secondary">
            {{ $t('routes.dashboard.analysis.yesterday') }}
          </ATypographyText>
          <ATypographyText type="danger">
            1024
            <IconArrowRise />
          </ATypographyText>
        </div>
      </div>
      <div
        ref="domRef"
        class="float-right h-90px vertical-bottom"
        style="width: calc(100% - 120px)"
      ></div>
    </div>
  </ACard>
</template>

<script lang="ts" setup>
  import { ECOption, useEcharts } from '@/hooks/web/useEcharts';

  interface Props {
    title: string;
    chartOption: ECOption;
  }

  const props = defineProps<Props>();

  const { domRef } = useEcharts(props.chartOption, {
    onRender() {},
  });
</script>

<style lang="less" scoped>
  :deep(.arco-card) {
    border-radius: 4px;
  }

  :deep(.arco-card-body) {
    width: 100%;
    height: 134px;
    padding: 0;
  }

  :deep(.content) {
    float: left;
    width: 108px;
    height: 102px;
  }

  :deep(.arco-statistic) {
    .arco-statistic-title {
      font-size: 16px;
      font-weight: bold;
      white-space: nowrap;
    }

    .arco-statistic-content {
      margin-top: 10px;
    }
  }
</style>
