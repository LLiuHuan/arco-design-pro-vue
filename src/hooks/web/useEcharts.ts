/**
 * https://github.com/soybeanjs/soybean-admin/blob/main/src/hooks/common/echarts.ts
 */

import { effectScope, nextTick, onScopeDispose, ref, unref, watch } from 'vue';
import * as echarts from 'echarts/core';
import type {
  BarSeriesOption,
  GaugeSeriesOption,
  LineSeriesOption,
  PictorialBarSeriesOption,
  PieSeriesOption,
  RadarSeriesOption,
  ScatterSeriesOption,
  TreemapSeriesOption,
} from 'echarts/charts';
import {
  BarChart,
  GaugeChart,
  LineChart,
  PictorialBarChart,
  PieChart,
  RadarChart,
  ScatterChart,
  TreemapChart,
} from 'echarts/charts';
import type {
  DatasetComponentOption,
  GridComponentOption,
  LegendComponentOption,
  TitleComponentOption,
  ToolboxComponentOption,
  TooltipComponentOption,
} from 'echarts/components';
import {
  DatasetComponent,
  GridComponent,
  LegendComponent,
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  TransformComponent,
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';
import { useElementSize } from '@vueuse/core';
import { ThemeColorEnum } from '@/enums';
import { useRootSetting } from '@/hooks/setting';

export type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | PieSeriesOption
  | ScatterSeriesOption
  | PictorialBarSeriesOption
  | RadarSeriesOption
  | GaugeSeriesOption
  | TitleComponentOption
  | LegendComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | ToolboxComponentOption
  | DatasetComponentOption
  | TreemapSeriesOption
>;

echarts.use([
  TitleComponent,
  LegendComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  ToolboxComponent,
  BarChart,
  LineChart,
  PieChart,
  ScatterChart,
  PictorialBarChart,
  RadarChart,
  GaugeChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer,
  TreemapChart,
]);

interface ChartHooks {
  onRender?: (chart: echarts.ECharts) => void | Promise<void>;
  onUpdated?: (chart: echarts.ECharts) => void | Promise<void>;
  onDestroy?: (chart: echarts.ECharts) => void | Promise<void>;
}

/**
 * @description Echarts hooks函数
 * @description use echarts
 *
 * @param options echarts选项 - [echarts options]
 * @param hooks hooks函数 - [hooks function]
 */
export function useEcharts<T extends ECOption>(
  options: T,
  hooks: ChartHooks = {},
) {
  const scope = effectScope();

  const { getIsDarkMode, getThemeColor } = useRootSetting();

  const domRef = ref<HTMLElement | null>(null);
  const initialSize = { width: 0, height: 0 };
  const { width, height } = useElementSize(domRef, initialSize);

  let chart: echarts.ECharts | null = null;

  const {
    onRender = (instance) => {
      const textColor = unref(getIsDarkMode)
        ? 'rgb(224, 224, 224)'
        : 'rgb(31, 31, 31)';
      const maskColor = unref(getIsDarkMode)
        ? 'rgba(0, 0, 0, 0.4)'
        : 'rgba(255, 255, 255, 0.8)';

      instance.showLoading({
        color: unref(getThemeColor)[ThemeColorEnum.PRIMARY],
        textColor,
        fontSize: 14,
        maskColor,
      });
    },
    onUpdated = (instance) => {
      instance.hideLoading();
    },
    onDestroy,
  } = hooks;

  /**
   * @description 是否可以渲染图表
   * @description whether can render chart
   *
   * @description 当domRef准备就绪且initialSize有效时
   * @description when domRef is ready and initialSize is valid
   */
  function canRender() {
    return domRef.value && initialSize.width > 0 && initialSize.height > 0;
  }

  /**
   * @description 是否已渲染图表
   * @description is chart rendered
   * */
  function isRendered() {
    return Boolean(domRef.value && chart);
  }

  /**
   * @description 更新图表选项
   * @description update chart options
   *
   * @param callback callback function
   */
  async function updateOptions(callback: (opts: T) => ECOption) {
    console.log('updateOptions');
    if (!isRendered()) return;
    const updatedOpts = callback(options);

    Object.assign(options, updatedOpts);

    if (isRendered()) {
      chart?.clear();
    }

    chart?.setOption({ ...updatedOpts, backgroundColor: 'transparent' });
    await onUpdated?.(chart!);
  }

  function setOptions(options: T) {
    chart?.setOption(options);
  }

  /**
   * @description 渲染图表
   * @description render chart
   */
  async function render() {
    console.log('render');
    if (!isRendered()) {
      const chartTheme = unref(getIsDarkMode) ? 'dark' : 'light';

      await nextTick();

      chart = echarts.init(domRef.value, chartTheme);

      chart.setOption({ ...options, backgroundColor: 'transparent' });

      await onRender?.(chart);
    }
  }

  /**
   * @description 调整图表大小
   * @description resize chart
   */
  function resize() {
    console.log('resize');
    chart?.resize();
  }

  /**
   * @description 销毁图表
   * @description destroy chart
   */
  async function destroy() {
    if (!chart) return;

    await onDestroy?.(chart);
    chart?.dispose();
    chart = null;
  }

  /**
   * @description 切换图表主题
   * @description change chart theme
   */
  async function changeTheme() {
    await destroy();
    await render();
    await onUpdated?.(chart!);
  }

  /**
   * @description 根据尺寸渲染图表
   * @description render chart by size
   *
   * @param w width
   * @param h height
   */
  async function renderChartBySize(w: number, h: number) {
    initialSize.width = w;
    initialSize.height = h;

    // 尺寸不正常，销毁图表
    // size is abnormal, destroy chart
    if (!canRender()) {
      await destroy();
      return;
    }

    // 调整图表大小
    // resize chart
    if (isRendered()) {
      resize();
    } else {
      // 渲染图表
      // render chart
      await render();
    }
  }

  scope.run(() => {
    watch([width, height], ([newWidth, newHeight]) => {
      renderChartBySize(newWidth, newHeight);
    });

    watch(getIsDarkMode, () => {
      changeTheme();
    });
  });

  onScopeDispose(() => {
    console.log('onScopeDispose');
    destroy();
    scope.stop();
  });

  return {
    domRef,
    updateOptions,
    setOptions,
  };
}
