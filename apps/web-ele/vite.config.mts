/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:38:40
 * @LastEditTime: 2025-05-08 16:20:55
 * @LastEditors: LLiuHuan
 */
import { defineConfig } from '@arco/vite-config';
// import UnoCSS from 'unocss/vite'

import ElementPlus from 'unplugin-element-plus/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
      ],
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
