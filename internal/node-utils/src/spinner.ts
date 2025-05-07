/*
 * @Description: 封装 ora 插件，用于在命令行中显示加载状态和成功/失败信息。
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:51:29
 * @LastEditors: LLiuHuan
 */
import type { Ora } from 'ora';

import ora from 'ora';

interface SpinnerOptions {
  failedText?: string;
  successText?: string;
  title: string;
}

/**
 * 封装 ora 插件，用于在命令行中显示加载状态和成功/失败信息。
 * @param {SpinnerOptions} options - 配置选项。
 * @returns {Promise<T>} - 包装后的 Promise，在成功时返回结果，失败时抛出异常。
 */
export async function spinner<T>(
  { failedText, successText, title }: SpinnerOptions,
  callback: () => Promise<T>,
): Promise<T> {
  const loading: Ora = ora(title).start();

  try {
    const result = await callback();
    loading.succeed(successText || 'Success!');
    return result;
  } catch (error) {
    loading.fail(failedText || 'Failed!');
    throw error;
  } finally {
    loading.stop();
  }
}
