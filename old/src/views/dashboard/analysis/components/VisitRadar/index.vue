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
    legend: {
      bottom: 0,
      data: [
        t('dashboard.analysis.access'),
        t('dashboard.analysis.buy'),
      ] as string[],
    },
    tooltip: {},
    radar: {
      radius: '60%',
      splitNumber: 8,
      indicator: [
        {
          name: t('dashboard.analysis.computer'),
        },
        {
          name: t('dashboard.analysis.charger'),
        },
        {
          name: t('dashboard.analysis.headphones'),
        },
        {
          name: t('dashboard.analysis.phone'),
        },
        {
          name: t('dashboard.analysis.Ipad'),
        },
        {
          name: t('dashboard.analysis.earphone'),
        },
      ],
    },
    series: [
      {
        type: 'radar',
        symbolSize: 0,
        areaStyle: {
          shadowBlur: 0,
          shadowColor: 'rgba(0,0,0,.2)',
          shadowOffsetX: 0,
          shadowOffsetY: 10,
          opacity: 1,
        },
        data: [
          {
            value: [] as number[],
            name: t('dashboard.analysis.access'),
            itemStyle: {
              color: '#b6a2de',
            },
          },
          {
            value: [] as number[],
            name: t('dashboard.analysis.buy'),
            itemStyle: {
              color: '#5ab1ef',
            },
          },
        ],
      },
    ],
  }));

  async function mockData() {
    await new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });

    updateOptions((opts) => {
      // opts.legend.data = ['访问', '购买'];
      opts.series[0].data[0].value = [90, 50, 86, 40, 50, 20];
      opts.series[0].data[1].value = [70, 75, 70, 76, 20, 85];

      return opts;
    });
  }

  function updateLocale() {
    updateOptions((opts, factory) => {
      const originOpts = factory();
      opts.legend.data = originOpts.legend.data;
      opts.series[0].data[0].name = originOpts.series[0].data[0].name;
      opts.series[0].data[1].name = originOpts.series[0].data[1].name;

      opts.radar.indicator = originOpts.radar.indicator;

      return opts;
    });
  }

  function init() {
    mockData();
  }

  watch(getLocale, () => {
    updateLocale();
  });

  init();
</script>

<style lang="less" scoped></style>
