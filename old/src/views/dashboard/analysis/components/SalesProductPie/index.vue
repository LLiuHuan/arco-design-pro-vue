<template>
  <ACard :bordered="false">
    <div ref="domRef" class="w-full h-300px"></div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useEcharts } from '@/hooks/web/useEcharts';
  import { watch } from 'vue';
  import { useLocale } from '@/hooks/web/useLocale';
  import { useI18n } from '@/hooks/web/useI18n';

  const { getLocale } = useLocale();
  const { t } = useI18n();

  const { domRef, updateOptions } = useEcharts(() => ({
    tooltip: {
      trigger: 'item',
    },
    legend: {
      bottom: '1%',
      left: 'center',
      itemStyle: {
        borderWidth: 0,
      },
    },
    series: [
      {
        color: ['#5da8ff', '#8e9dff', '#fedc69', '#26deca'],
        name: t('dashboard.analysis.timeArrangement'),
        type: 'pie',
        radius: ['45%', '75%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 1,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
          },
        },
        labelLine: {
          show: false,
        },
        data: [] as { name: string; value: number }[],
      },
    ],
  }));

  // mock data
  async function mockData() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    updateOptions((opts) => {
      opts.series[0].data = [
        { value: 20, name: t('dashboard.analysis.study') },
        { value: 10, name: t('dashboard.analysis.entertainment') },
        { value: 30, name: t('dashboard.analysis.work') },
        { value: 40, name: t('dashboard.analysis.rest') },
      ];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { value: 20, name: t('dashboard.analysis.study') },
        { value: 10, name: t('dashboard.analysis.entertainment') },
        { value: 30, name: t('dashboard.analysis.work') },
        { value: 40, name: t('dashboard.analysis.rest') },
      ];

      return opts;
    });
  }

  async function init() {
    mockData();
  }

  watch(getLocale, () => {
    updateLocale();
  });

  init();
</script>

<style lang="less" scoped></style>
