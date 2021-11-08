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

  return {
    plugins: [vue()],
    esbuild: {},
    resolve: {
      alias: [
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
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
