/**
 * Mock 数据插件
 */

import { viteMockServe } from 'vite-plugin-mock';

export const configMockPlugin = (isBuild: boolean) => {
  return viteMockServe({
    ignore: /^\_/,
    mockPath: 'mock',
    localEnabled: !isBuild,
    prodEnabled: isBuild,
    injectCode: `
		import { setupMockServer } from '../mock';
		setupMockServer();
	`,
  });
};
