/*
 * @Description: 运行时打印信息
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:52:54
 * @LastEditTime: 2025-05-16 11:30:32
 * @LastEditors: LLiuHuan
 */
import type { PluginOption } from 'vite';

import type { PrintPluginOptions } from '../typing';

import { colors } from '@arco/node-utils';

export const vitePrintPlugin = (
  options: PrintPluginOptions = {},
): PluginOption => {
  const { infoMap = {} } = options;

  return {
    configureServer(server) {
      const _printUrls = server.printUrls;
      server.printUrls = () => {
        _printUrls();

        for (const [key, value] of Object.entries(infoMap)) {
          console.log(
            `  ${colors.green('➜')}  ${colors.bold(key)}: ${colors.cyan(value)}`,
          );
        }
      };
    },
    enforce: 'pre',
    name: 'vite:print-info',
  };
};
