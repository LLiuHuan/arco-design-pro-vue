<template>
  <a-spin :loading="loading" style="width: 100%">
    <a-card :bordered="false" :style="cardStyle">
      <div class="content-wrap">
        <div class="content">
          <a-statistic
            :title="title"
            :value="1024"
            :value-from="0"
            animation
            show-group-separator
          />
          <div class="desc">
            <a-typography-text type="secondary" class="label">
              {{ $t('dashboard.analysis.data-card.yesterday') }}
            </a-typography-text>
            <a-typography-text type="danger">
              1024
              <icon-arrow-rise />
            </a-typography-text>
          </div>
        </div>
        <div ref="chartRef" class="chart"></div>
      </div>
    </a-card>
  </a-spin>
</template>

<script lang="ts" setup>
  import { CSSProperties, PropType, ref } from 'vue';
  import useLoading from '@/hooks/loading';
  import { ECOption, useEcharts } from '@/composables/echarts';

  const chartOption = ref<ECOption>({});

  const props = defineProps({
    title: {
      type: String,
      default: '',
    },
    chartType: {
      type: String,
      default: '',
    },
    cardStyle: {
      type: Object as PropType<CSSProperties>,
      default: () => {
        return {};
      },
    },
  });

  const { loading, setLoading } = useLoading(true);

  const fetch = () => {
    console.log(props.chartType);
    if (props.chartType === 'line') {
      chartOption.value = {
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
        series: [
          {
            name: '2001',
            data: [10, 24, 100, 32, 40, 55, 66, 77, 11, 23, 45, 14],
            type: 'line',
            showSymbol: false,
            smooth: true,
            lineStyle: {
              color: '#165DFF',
              width: 3,
            },
          },
          {
            name: '2002',
            data: [46, 12, 20, 33, 27, 11, 79, 99, 82, 44, 66, 88],
            type: 'line',
            showSymbol: false,
            smooth: true,
            lineStyle: {
              color: '#6AA1FF',
              width: 3,
              type: 'dashed',
            },
          },
        ],
      };
    } else if (props.chartType === 'bar') {
      chartOption.value = {
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
      };
    } else {
      chartOption.value = {
        grid: {
          left: 0,
          right: 0,
          top: 0,
          bottom: 0,
        },
        legend: {
          show: true,
          top: 'center',
          right: '0',
          orient: 'vertical',
          icon: 'circle',
          itemWidth: 6,
          itemHeight: 6,
          textStyle: {
            color: '#4E5969',
          },
        },
        tooltip: {
          show: true,
        },
        series: [
          {
            name: '总计',
            type: 'pie',
            radius: ['50%', '70%'],
            label: {
              show: false,
            },
            data: [
              { value: 1024, name: '微信' },
              { value: 1024, name: '抖音' },
              { value: 1024, name: '知乎' },
            ],
          },
        ],
      };
    }

    setLoading(false);
  };

  fetch();
  console.log(chartOption.value);
  const { domRef: chartRef } = useEcharts(chartOption);
</script>

<style scoped lang="less">
  :deep(.arco-card) {
    border-radius: 4px;
  }
  :deep(.arco-card-body) {
    width: 100%;
    height: 134px;
    padding: 0;
  }
  .content-wrap {
    width: 100%;
    padding: 16px;
    white-space: nowrap;
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

  .chart {
    float: right;
    width: calc(100% - 108px);
    height: 90px;
    vertical-align: bottom;
  }

  .label {
    padding-right: 8px;
    font-size: 12px;
  }
</style>
