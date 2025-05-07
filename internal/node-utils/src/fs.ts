/*
 * @Description: 文件操作
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:49:26
 * @LastEditors: LLiuHuan
 */
import { promises as fs } from 'node:fs';
import { dirname } from 'node:path';

/**
 * 输出 JSON 文件
 * @param filePath 文件路径
 * @param data 文件内容
 * @param spaces 格式化空格
 */
export async function outputJSON(
  filePath: string,
  data: any,
  spaces: number = 2,
) {
  try {
    const dir = dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    const jsonData = JSON.stringify(data, null, spaces);
    await fs.writeFile(filePath, jsonData, 'utf8');
  } catch (error) {
    console.error('Error writing JSON file:', error);
    throw error;
  }
}

/**
 * 确保文件存在，如果不存在则创建一个空的文件
 * @param filePath 文件路径
 */
export async function ensureFile(filePath: string) {
  try {
    const dir = dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, '', { flag: 'a' });
  } catch (error) {
    console.error('Error ensuring file:', error);
    throw error;
  }
}

/**
 * 读取 JSON 文件
 * @param filePath 文件路径
 */
export async function readJSON(filePath: string) {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading JSON file:', error);
    throw error;
  }
}

