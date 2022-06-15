import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, setupVitePlugins, viteDefine } from './build';
import { createViteBuild } from './build/config/build';
import { getEnvConfig } from '.env-config';

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const rootPath = fileURLToPath(new URL('./', import.meta.url));
  const srcPath = `${rootPath}src`;

  const isOpenProxy = viteEnv.VITE_HTTP_PROXY === 'true';
  const envConfig = getEnvConfig(viteEnv);
  return {
    base: viteEnv.VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    define: viteDefine,
    plugins: setupVitePlugins(viteEnv, srcPath),
    css: {
      preprocessorOptions: {
        // scss: {
        //   additionalData: `@use "./src/assets/styles/scss/global.scss" as *;`,
        // },
        less: {
          modifyVars: {
            hack: `true; @import (reference) "${resolve('src/assets/styles/breakpoint.less')}";`,
          },
          javascriptEnabled: true,
        },
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT || 3200,
      open: true,
      proxy: createViteProxy(isOpenProxy, envConfig),
    },
    build: createViteBuild(viteEnv),
  };
});
