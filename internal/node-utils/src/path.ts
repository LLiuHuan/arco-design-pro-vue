/*
 * @Description: 文件路径工具
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:50:12
 * @LastEditors: LLiuHuan
 */
import { posix } from 'node:path';

/**
 * 将给定的文件路径转换为 POSIX 风格。
 * @param {string} pathname - 原始文件路径。
 */
function toPosixPath(pathname: string) {
  return pathname.split(`\\`).join(posix.sep);
}

export { toPosixPath };
