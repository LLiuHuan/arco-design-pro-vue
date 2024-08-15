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
    },
    series: [
      {
        color: ['#5ab1ef', '#b6a2de', '#67e0e3', '#2ec7c9'],
        name: t('dashboard.analysis.accessSource'),
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: false,
          position: 'center',
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '12',
            fontWeight: 'bold',
          },
        },
        labelLine: {
          show: false,
        },
        data: [] as { name: string; value: number }[],
        animationType: 'scale',
        animationEasing: 'exponentialInOut',
        animationDelay() {
          return Math.random() * 100;
        },
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
        { value: 1048, name: t('dashboard.analysis.searchEngine') },
        { value: 735, name: t('dashboard.analysis.directAccess') },
        { value: 580, name: t('dashboard.analysis.emailMarketing') },
        { value: 484, name: t('dashboard.analysis.unionAdvertising') },
      ];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.series[0].name = originOpts.series[0].name;

      opts.series[0].data = [
        { value: 1048, name: t('dashboard.analysis.searchEngine') },
        { value: 735, name: t('dashboard.analysis.directAccess') },
        { value: 580, name: t('dashboard.analysis.emailMarketing') },
        { value: 484, name: t('dashboard.analysis.unionAdvertising') },
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
