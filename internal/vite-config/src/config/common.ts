/*
 * @Description: 通用配置
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:52:54
 * @LastEditTime: 2025-05-07 16:07:59
 * @LastEditors: LLiuHuan
 */
import type { UserConfig } from 'vite';

async function getCommonConfig(): Promise<UserConfig> {
  return {
    build: {
      chunkSizeWarningLimit: 2000,
      reportCompressedSize: false,
      sourcemap: false,
    },
  };
}

export { getCommonConfig };
