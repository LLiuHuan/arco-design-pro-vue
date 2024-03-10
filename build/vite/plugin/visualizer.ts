import { visualizer } from 'rollup-plugin-visualizer';

// Analysis of packaged file size results - [打包文件大小结果分析]
export default visualizer({
  gzipSize: true,
  brotliSize: true,
  open: true,
});
