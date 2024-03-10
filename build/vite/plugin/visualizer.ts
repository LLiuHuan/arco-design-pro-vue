/**
 * @description Analysis of packaged file size results - [打包文件大小结果分析]
 */

import { visualizer } from 'rollup-plugin-visualizer';
import { PluginOption } from 'vite';

export const configVisualizerPlugin = () => {
  return visualizer({
    filename: './node_modules/.cache/visualizer/stats.html',
    gzipSize: true,
    brotliSize: true,
    open: true,
  }) as PluginOption;
};
