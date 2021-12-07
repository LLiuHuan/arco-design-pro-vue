// import type { Plugin } from 'vite';
// import vue from '@vitejs/plugin-vue';
// import vueJsx from '@vitejs/plugin-vue-jsx';
// import alias from '@rollup/plugin-alias';
// import styleImport from 'vite-plugin-style-import';
// import WindiCSS from 'vite-plugin-windicss';
// import { viteMockServe } from 'vite-plugin-mock';
//
// export function createVitePlugins() {
//   const vitePlugins: (Plugin | Plugin[])[] = [
//     // have to
//     vue(),
//     // have to
//     vueJsx(),
//     alias(),
//     // 没弄懂有没有用
//     styleImport({
//       libs: [
//         // Dynamic import @arco-design styles
//         {
//           libraryName: '@arco-design/web-vue',
//           esModule: true,
//           resolveStyle: (name) => `@arco-design/web-vue/es/${name}/style/index`,
//         },
//         // Dynamic import @arco-design icons
//         {
//           libraryName: '@arco-design/web-vue/icon',
//           libraryNameChangeCase: 'pascalCase',
//           resolveStyle: (name) => `@arco-design/web-vue/icon/react-icon/${name}`,
//           resolveComponent: (name) => `@arco-design/web-vue/icon/react-icon/${name}`,
//         },
//       ],
//     }),
//     WindiCSS(),
//     viteMockServe({
//       ignore: /^\_/, // 忽略指定格式的文件
//       mockPath: 'mock', // mock文件夹
//       supportTs: true, // 读取ts，打开后就无法监视js了
//       localEnabled: !isBuild, // 开发打包开关
//       prodEnabled: isBuild && VITE_GLOB_PROD_MOCK, // 生产打包开关
//       logger: true, //是否在控制台显示请求日志
//       injectCode: `
//          import { setupProdMockServer } from '../mock/_createProdMockServer.ts';
//
//          setupProdMockServer();
//          `,
//     }),
//   ];
// }
