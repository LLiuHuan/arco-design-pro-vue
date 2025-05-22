/*
 * @Description: vitest.config.ts
 * @Author: LLiuHuan
 * @Date: 2025-04-21 15:44:22
 * @LastEditTime: 2025-05-22 15:39:13
 * @LastEditors: LLiuHuan
 */
import Vue from '@vitejs/plugin-vue';
import VueJsx from '@vitejs/plugin-vue-jsx';
import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [Vue(), VueJsx()],
  test: {
    environment: 'happy-dom',
    exclude: [...configDefaults.exclude, '**/e2e/**'],
  },
});
