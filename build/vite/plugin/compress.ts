import compressPlugin from 'vite-plugin-compression';
import type { PluginOption } from 'vite';

/**
 * 开启GZIP压缩
 * https://github.com/anncwb/vite-plugin-compression
 * @param compress 压缩算法
 * @param deleteOriginFile 压缩后是否删除原文件
 */
export const configCompressPlugin = (
  compress: 'gzip' | 'brotli' | 'none',
  deleteOriginFile = false
): PluginOption | PluginOption[] => {
  const compressList = compress.split(',');

  const plugins: PluginOption[] = [];

  if (compressList.includes('gzip')) {
    plugins.push(
      compressPlugin({
        ext: '.gz',
        deleteOriginFile,
      })
    );
  }

  if (compressList.includes('brotli')) {
    plugins.push(
      compressPlugin({
        ext: '.br',
        algorithm: 'brotliCompress',
        deleteOriginFile,
      })
    );
  }

  return plugins;
};
