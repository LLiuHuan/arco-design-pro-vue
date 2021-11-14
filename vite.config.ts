import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import eslintPlugin from "vite-plugin-eslint";
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { format } from 'date-fns';
import pkg from './package.json';
const { dependencies, devDependencies, name, version } = pkg;

const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
};

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);
  const { VITE_PORT } = viteEnv;

  const alias: Record<string, string> = {
    // '@': `${resolve(__dirname, 'src')}/`,
    '@': pathResolve('src') + '/',
    '//#//': pathResolve('types') + '/',
  };

  if (env) {
    // 解决警告You are running the esm-bundler build of vue-i18n.
    alias['vue-i18n'] = 'vue-i18n/dist/vue-i18n.cjs.js';
  }

  return {
    plugins: [vue()],
    esbuild: {},
    base: '/arco-design-pro-vue/',
    resolve: {
      alias: alias,
      dedupe: ['vue'],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    server: {
      host: true,
      port: VITE_PORT,
    },
  };
};
