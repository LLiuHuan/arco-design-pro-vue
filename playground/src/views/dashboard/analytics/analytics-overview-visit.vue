<script lang="ts" setup>
import type { EchartsUIType } from '@arco/plugins/echarts';

import { computed, onMounted, ref } from 'vue';

import { EchartsUI, useEcharts } from '@arco/plugins/echarts';

const props = withDefaults(
  defineProps<{
    data?: number[];
  }>(),
  {
    data: () => [22, 88, 30, 24, 39, 24, 64, 93],
  },
);
const chartRef = ref<EchartsUIType>();
const { renderEcharts } = useEcharts(chartRef);

const CHART_COLORS = {
  PRIMARY: '#2CAB40',
  SECONDARY: '#86DF6C',
} as const;

const chartData = computed(() =>
  props.data.map((value, index) => ({
    value,
    itemStyle: {
      color: index % 2 === 0 ? CHART_COLORS.PRIMARY : CHART_COLORS.SECONDARY,
    },
  })),
);

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
      data: chartData.value,
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
