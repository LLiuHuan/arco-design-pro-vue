/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-16 16:08:34
 * @LastEditTime: 2025-05-27 14:54:00
 * @LastEditors: LLiuHuan
 */
import type { RouteLocationNormalized } from 'vue-router';

export interface TabDefinition extends RouteLocationNormalized {
  /**
   * 标签页的key
   */
  key?: string;
}
