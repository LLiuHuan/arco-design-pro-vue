/**
 * @description: 压缩插件
 */
import ViteCompression from 'vite-plugin-compression';

export const configCompressPlugin = (viteEnv: ImportMetaEnv) => {
  const { VITE_COMPRESS_TYPE = 'gzip', VITE_COMPRESS_DELETE_ORIGIN_FILE } =
    viteEnv;
  return ViteCompression({
    algorithm: VITE_COMPRESS_TYPE,
    ext: VITE_COMPRESS_TYPE === 'brotliCompress' ? '.br' : '.gz',
    deleteOriginFile: VITE_COMPRESS_DELETE_ORIGIN_FILE === 'Y',
  });
};
