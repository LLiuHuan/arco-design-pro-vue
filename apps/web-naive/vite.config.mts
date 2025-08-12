/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 02:14:36
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
            target: 'https://m1.apifoxmock.com/m1/3402401-1018037-default',
            ws: true,
          },
        },
      },
    },
  };
});
