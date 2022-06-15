/**
 * Mock 数据插件
 */

import { viteMockServe } from 'vite-plugin-mock';

export default viteMockServe({
  mockPath: 'mock',
  injectCode: `
		import { setupMockServer } from '../mock';
		setupMockServer();
	`,
});
// const localEnabled: boolean = (process.env.USE_MOCK as unknown as boolean) || false;
// const prodEnabled: boolean = (process.env.USE_CHUNK_MOCK as unknown as boolean) || false;
// console.log(localEnabled, prodEnabled);
// export default viteMockServe({
//   // ↓解析根目录下的mock文件夹
//   mockPath: 'mock',
//   localEnabled: localEnabled, // 开发打包开关
//   prodEnabled: prodEnabled, // 生产打包开关
//   // supportTs: true, // 打开后，可以读取 ts 文件模块。 请注意，打开后将无法监视.js 文件。
//   // watchFiles: true, // 监视文件更改
//   injectCode: `
//   	import { setupMockServer } from '../mock';
//   	setupMockServer();
//   `,
// });
