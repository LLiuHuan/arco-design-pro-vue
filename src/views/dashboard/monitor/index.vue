<template>
  <div class="container">
    <a-space direction="vertical" :size="16" style="display: block">
      <a-row class="grid-demo" :gutter="12">
        <a-col :span="16" title="门店人数趋势变化">
          <a-card hoverable>
            <div class="t1" id="t1" style="height: 400px">123</div>
          </a-card>
        </a-col>
        <a-col :span="8">
          <a-card hoverable title="综合指标分析">
            <div></div>
          </a-card>
        </a-col>
      </a-row>
    </a-space>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted } from 'vue';
  // echarts
  import * as echarts from 'echarts/core';
  import {
    GridComponent,
    GridComponentOption,
    LegendComponent,
    LegendComponentOption,
    TitleComponent,
    TitleComponentOption,
    ToolboxComponent,
    ToolboxComponentOption,
    TooltipComponent,
    TooltipComponentOption,
  } from 'echarts/components';
  import { LineChart, LineSeriesOption } from 'echarts/charts';
  import { UniversalTransition } from 'echarts/features';
  import { CanvasRenderer } from 'echarts/renderers';
  // import light from '@/styles/echarts/light';
  import dark from '@/styles/echarts/dark.json';
  import { storage } from '@/utils/storage/storage';

  export default defineComponent({
    name: 'Monitor',
    setup() {
      // asd
      echarts.use([
        TitleComponent,
        ToolboxComponent,
        TooltipComponent,
        GridComponent,
        LegendComponent,
        LineChart,
        CanvasRenderer,
        UniversalTransition,
      ]);

      type EChartsOption = echarts.ComposeOption<
        | TitleComponentOption
        | ToolboxComponentOption
        | TooltipComponentOption
        | GridComponentOption
        | LegendComponentOption
        | LineSeriesOption
      >;

      // const state = reactive({
      //   theme: '',
      // });

      echarts.registerTheme('dark', dark);

      const tt = () => {
        let myChart;
        const chartDom = document.getElementById('t1')!;
        if (storage.get('theme') === 'dark') {
          myChart = echarts.init(chartDom, 'dark');
        } else {
          myChart = echarts.init(chartDom);
        }
        // alert(state.theme);
        let option: EChartsOption;

        option = {
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
            data: ['Email', 'Union Ads'],
          },
          toolbox: {
            feature: {
              saveAsImage: {},
            },
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
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: 'Email',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [120, 132, 101, 134, 90, 230, 210],
              smooth: true,
            },
            {
              name: 'Union Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [220, 182, 191, 234, 290, 330, 310],
              smooth: true,
            },
            {
              name: 'Video Ads',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [150, 232, 201, 154, 190, 330, 410],
              smooth: true,
            },
            {
              name: 'Direct',
              type: 'line',
              stack: 'Total',
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [320, 332, 301, 334, 390, 330, 320],
            },
            {
              name: 'Search Engine',
              type: 'line',
              stack: 'Total',
              label: {
                show: true,
                position: 'top',
              },
              areaStyle: {},
              emphasis: {
                focus: 'series',
              },
              data: [820, 932, 901, 934, 1290, 1330, 1320],
              smooth: true,
            },
          ],
        };

        option && myChart.setOption(option);
      };

      onMounted(() => {
        tt();
      });
      return {};
    },
  });
</script>

<style scoped>
  .grid-demo .arco-col {
    color: var(--color-white);
    text-align: center;
  }
</style>
