/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-06-04 17:40:06
 * @LastEditTime: 2025-06-04 17:40:47
 * @LastEditors: LLiuHuan
 */
import { colors, consola } from '@arco/node-utils';

import { cac } from 'cac';

import { run } from './run';

try {
  const turboRun = cac('turbo-run');

  turboRun
    .command('[script]')
    .usage(`Run turbo interactively.`)
    .action(async (command: string) => {
      run({ command });
    });

  // Invalid command
  turboRun.on('command:*', () => {
    consola.error(colors.red('Invalid command!'));
    process.exit(1);
  });

  turboRun.usage('turbo-run');
  turboRun.help();
  turboRun.parse();
} catch (error) {
  consola.error(error);
  process.exit(1);
}
