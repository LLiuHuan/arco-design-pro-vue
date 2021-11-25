import type { UserConfig, ConfigEnv } from 'vite';
import vue from '@vitejs/plugin-vue';
// import eslintPlugin from "vite-plugin-eslint";
import { resolve } from 'path';
import { loadEnv } from 'vite';
import { wrapperEnv } from './build/utils';
import { format } from 'date-fns';
import styleImport from 'vite-plugin-style-import';
import WindiCSS from 'vite-plugin-windicss';
import { viteMockServe } from 'vite-plugin-mock';
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
  };

  if (env) {
    // 解决警告You are running the esm-bundler build of vue-i18n.
    alias['vue-i18n'] = 'vue-i18n/dist/vue-i18n.cjs.js';
  }

  return {
    plugins: [
      vue(),
      // 没弄懂有没有用
      styleImport({
        libs: [
          // Dynamic import @arco-design styles
          {
            libraryName: '@arco-design/web-vue',
            esModule: true,
            resolveStyle: (name) => `@arco-design/web-vue/es/${name}/style/index`,
          },
          // Dynamic import @arco-design icons
          {
            libraryName: '@arco-design/web-vue/icon',
            libraryNameChangeCase: 'pascalCase',
            resolveStyle: (name) => `@arco-design/web-vue/icon/react-icon/${name}`,
            resolveComponent: (name) => `@arco-design/web-vue/icon/react-icon/${name}`,
          },
        ],
      }),
      WindiCSS(),
      viteMockServe({
        mockPath: './src/mock',
        supportTs: true,
      }),
    ],
    esbuild: {},
    base: '/arco-design-pro-vue/',
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
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      ],
      dedupe: ['vue'],
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          // Customize stylings here
          modifyVars: {
            // arcoblue-6 is the primary-color :)))
            'arcoblue-6': '#1DA57A',
          },
        },
      },
    },
    server: {
      host: true,
      port: VITE_PORT,
    },
  };
};
