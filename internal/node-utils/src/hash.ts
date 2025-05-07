/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:48:56
 * @LastEditors: LLiuHuan
 */
import { createHash } from 'node:crypto';

/**
 * 生产基于内容的 hash，可自定义长度
 * @param content
 * @param hashLSize
 */
function generatorContentHash(content: string, hashLSize?: number) {
  const hash = createHash('md5').update(content, 'utf8').digest('hex');

  if (hashLSize) {
    return hash.slice(0, hashLSize);
  }

  return hash;
}

export { generatorContentHash };
