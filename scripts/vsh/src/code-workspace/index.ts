/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-06-04 17:40:06
 * @LastEditTime: 2025-06-04 17:41:26
 * @LastEditors: LLiuHuan
 */
import type { CAC } from 'cac';

import { join, relative } from 'node:path';

import {
  colors,
  consola,
  findMonorepoRoot,
  getPackages,
  gitAdd,
  outputJSON,
  prettierFormat,
  toPosixPath,
} from '@arco/node-utils';

const CODE_WORKSPACE_FILE = join('arco-admin.code-workspace');

interface CodeWorkspaceCommandOptions {
  autoCommit?: boolean;
  spaces?: number;
}

async function createCodeWorkspace({
  autoCommit = false,
  spaces = 2,
}: CodeWorkspaceCommandOptions) {
  const { packages, rootDir } = await getPackages();

  let folders = packages.map((pkg) => {
    const { dir, packageJson } = pkg;
    return {
      name: packageJson.name,
      path: toPosixPath(relative(rootDir, dir)),
    };
  });

  folders = folders.filter(Boolean);

  const monorepoRoot = findMonorepoRoot();
  const outputPath = join(monorepoRoot, CODE_WORKSPACE_FILE);
  await outputJSON(outputPath, { folders }, spaces);

  await prettierFormat(outputPath);
  if (autoCommit) {
    await gitAdd(CODE_WORKSPACE_FILE, monorepoRoot);
  }
}

async function runCodeWorkspace({
  autoCommit,
  spaces,
}: CodeWorkspaceCommandOptions) {
  await createCodeWorkspace({
    autoCommit,
    spaces,
  });
  if (autoCommit) {
    return;
  }
  consola.log('');
  consola.success(colors.green(`${CODE_WORKSPACE_FILE} is updated!`));
  consola.log('');
}

function defineCodeWorkspaceCommand(cac: CAC) {
  cac
    .command('code-workspace')
    .usage('Update the `.code-workspace` file')
    .option('--spaces [number]', '.code-workspace JSON file spaces.', {
      default: 2,
    })
    .option('--auto-commit', 'auto commit .code-workspace JSON file.', {
      default: false,
    })
    .action(runCodeWorkspace);
}

export { defineCodeWorkspaceCommand };
