import { defineConfig, loadEnv } from 'vite';
import { fileURLToPath } from 'url';
import { getEnvConfig } from './.env.config';
import { createVitePlugins, createViteProxy } from './build';

// https://vitejs.dev/config/
export default defineConfig((configEnv) => {
  const viteEnv = loadEnv(configEnv.mode, process.cwd()) as ImportMetaEnv;
  const rootPath = fileURLToPath(new URL('./', import.meta.url));
  const srcPath = `${rootPath}src`;
  const isBuild = configEnv.command === 'build';

  const { VITE_HTTP_PROXY = false, VITE_BASE_URL, VITE_PORT } = viteEnv;

  const envConfig = getEnvConfig(viteEnv);

  console.log(viteEnv.DEV, viteEnv.PROD, viteEnv.MODE, 'APP_ENV');
  return {
    base: VITE_BASE_URL,
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      },
    },
    plugins: createVitePlugins(viteEnv, srcPath, isBuild),
    server: {
      host: '0.0.0.0',
      port: VITE_PORT || 3200,
      open: true,
      proxy: createViteProxy(VITE_HTTP_PROXY, envConfig),
    },
  };
});
