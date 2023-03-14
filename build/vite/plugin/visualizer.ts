import { visualizer } from 'rollup-plugin-visualizer';

export const configVisualizerPlugin = (isReportMode: boolean) => {
  if (isReportMode) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    });
  }
  return [];
};
