import { fileURLToPath } from 'url';
import { resolve } from 'path';
import { defineConfig, loadEnv } from 'vite';
import { createViteProxy, createViteBuild, createVitePlugins, viteDefine } from './build';
import { getEnvConfig } from '.env-config';

export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const rootPath = fileURLToPath(new URL('./', import.meta.url));
  const srcPath = `${rootPath}src`;
  const isBuild = configEnv.command === 'build';

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
    define: viteDefine,
    plugins: createVitePlugins(viteEnv, srcPath, isBuild),
    css: {
      preprocessorOptions: {
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
      port: VITE_PORT || 3200,
      open: true,
      proxy: createViteProxy(VITE_HTTP_PROXY, envConfig),
    },
    build: createViteBuild(viteEnv),
  };
});
