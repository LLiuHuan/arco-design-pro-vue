import { defineConfig, loadEnv } from 'vite';
import { resolve } from 'path';
import { getEnvConfig } from './.env.config';
import {
  createViteBuild,
  createVitePlugins,
  createViteProxy,
} from './build/vite';
import { getRootPath, getSrcPath } from './build/utils';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;

  const rootPath = getRootPath();
  const srcPath = getSrcPath();

  const { VITE_HTTP_PROXY = false, VITE_BASE_URL, VITE_PORT } = viteEnv;

  const envConfig = getEnvConfig(viteEnv);

  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    plugins: createVitePlugins(viteEnv),
    server: {
      host: '0.0.0.0',
      port: VITE_PORT || 3200,
      open: true,
      proxy: createViteProxy(VITE_HTTP_PROXY, envConfig),
    },
    build: createViteBuild(viteEnv),
    css: {
      preprocessorOptions: {
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/styles/config.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
  };
});
