import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'node:url';
import dayjs from 'dayjs';
import { getEnvConfig } from './.env.config';
import {
  createViteBuild,
  createVitePlugins,
  createViteProxy,
} from './build/vite';

// crypto-js 默认使用4.1.1，最新版打包以后报错
// unocss默认使用0.58.5，最新版改成ejs了，需要手动改回0.58.5

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;

  const { VITE_HTTP_PROXY = false, VITE_BASE_URL, VITE_PORT } = viteEnv;

  const envConfig = getEnvConfig(viteEnv);

  const buildTime = dayjs().format('YYYY-MM-DD HH:mm:ss');

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': fileURLToPath(new URL('./', import.meta.url)),
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    plugins: createVitePlugins(viteEnv, configEnv.command === 'build'),
    define: {
      BUILD_TIME: JSON.stringify(buildTime),
    },
    server: {
      host: '0.0.0.0',
      port: VITE_PORT || 3200,
      open: true,
      proxy: createViteProxy(VITE_HTTP_PROXY, envConfig),
    },
    optimizeDeps: {
      exclude: ['crypto-js'],
    },
    build: createViteBuild(viteEnv),
    // 需要引入arco全局样式
    // css: {
    //   preprocessorOptions: {
    //     less: {
    //       modifyVars: {
    //         'color-menu-dark-bg': '#001428',
    //         // hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
    //       },
    //       javascriptEnabled: true,
    //     },
    //   },
    // },
  };
});
