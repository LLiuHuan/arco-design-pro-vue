/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:38:40
 * @LastEditTime: 2025-05-28 11:46:32
 * @LastEditors: LLiuHuan
 */
import { defineConfig } from '@arco/vite-config';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
