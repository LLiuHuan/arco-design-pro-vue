/*
 * @Description: 格式化工具
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:50:38
 * @LastEditors: LLiuHuan
 */
import fs from 'node:fs/promises';

import { format, getFileInfo, resolveConfig } from 'prettier';

/**
 * @description 格式化文件
 * @param filepath 文件路径
 */
async function prettierFormat(filepath: string) {
  const prettierOptions = await resolveConfig(filepath, {});

  const fileInfo = await getFileInfo(filepath);

  const input = await fs.readFile(filepath, 'utf8');
  const output = await format(input, {
    ...prettierOptions,
    parser: fileInfo.inferredParser as any,
  });
  if (output !== input) {
    await fs.writeFile(filepath, output, 'utf8');
  }
  return output;
}

export { prettierFormat };
