<script lang="ts" setup>
import type { EchartsUIType } from '@arco/plugins/echarts';

import { onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@arco/plugins/echarts';

const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

onMounted(() => {
  renderEcharts({
    grid: {
      left: 0,
      right: 0,
      top: 10,
      bottom: 0,
    },
    xAxis: {
      type: 'category',
      show: false,
    },
    yAxis: {
      show: false,
    },
    tooltip: {
      show: true,
      trigger: 'axis',
    },
    series: {
      name: 'total',
      data: [
        {
          value: 22,
          itemStyle: {
            color: '#2CAB40',
          },
        },
        {
          value: 88,
          itemStyle: {
            color: '#86DF6C',
          },
        },
        {
          value: 30,
          itemStyle: {
            color: '#2CAB40',
          },
        },
        {
          value: 24,
          itemStyle: {
            color: '#86DF6C',
          },
        },
        {
          value: 39,
          itemStyle: {
            color: '#2CAB40',
          },
        },
        {
          value: 24,
          itemStyle: {
            color: '#86DF6C',
          },
        },
        {
          value: 64,
          itemStyle: {
            color: '#2CAB40',
          },
        },
        {
          value: 93,
          itemStyle: {
            color: '#86DF6C',
          },
        },
      ],
      type: 'bar',
      barWidth: 7,
      itemStyle: {
        borderRadius: 2,
      },
    },
  });
});
</script>

<template>
  <EchartsUI ref="chartRef" height="70px" width="120px" />
</template>
