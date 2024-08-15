<template>
  <ACard :bordered="false">
    <div ref="domRef" class="w-full h-300px"></div>
  </ACard>
</template>

<script lang="ts" setup>
  import { useEcharts } from '@/hooks/web/useEcharts';
  import { watch } from 'vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useLocaleStore } from '@/store/modules/locale';
  // import { useI18n } from 'vue-i18n';

  const localeStore = useLocaleStore();
  const { t } = useI18n();

  const { domRef, updateOptions } = useEcharts(() => ({
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985',
        },
      },
    },
    legend: {
      data: [
        t('dashboard.analysis.downloads'),
        t('dashboard.analysis.registrations'),
      ],
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        boundaryGap: false,
        data: [
          '06:00',
          '08:00',
          '10:00',
          '12:00',
          '14:00',
          '16:00',
          '18:00',
          '20:00',
          '22:00',
          '24:00',
        ],
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        color: '#8e9dff',
        name: t('dashboard.analysis.downloads'),
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#8e9dff',
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [] as number[],
      },
      {
        color: '#26deca',
        name: t('dashboard.analysis.registrations'),
        type: 'line',
        smooth: true,
        stack: 'Total',
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              {
                offset: 0.25,
                color: '#26deca',
              },
              {
                offset: 1,
                color: '#fff',
              },
            ],
          },
        },
        emphasis: {
          focus: 'series',
        },
        data: [] as number[],
      },
    ],
  }));

  async function mockData() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
    updateOptions((opts) => {
      opts.series[0].data = [
        4623, 6145, 6268, 6411, 1890, 4251, 2978, 3880, 3606, 4311,
      ];
      opts.series[1].data = [
        2208, 2016, 2916, 4512, 8281, 2008, 1963, 2367, 2956, 678,
      ];
      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();

      opts.legend.data = originOpts.legend.data;

      opts.series[0].name = originOpts.series[0].name;
      opts.series[1].name = originOpts.series[1].name;
      return opts;
    });
  }

  function init() {
    mockData();
  }

  watch(localeStore, () => {
    updateLocale();
  });

  init();
</script>

<style lang="less" scoped></style>
