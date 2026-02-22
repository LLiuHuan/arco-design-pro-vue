/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2026-02-19 01:29:54
 * @LastEditTime: 2026-02-19 01:39:52
 * @LastEditors: LLiuHuan
 */
import type { RouteRecordStringComponent } from '@qin/types';

import { requestClient } from '#/api/request';

/**
 * 获取用户所有菜单
 */
export async function getAllMenusApi() {
  return requestClient.get<RouteRecordStringComponent[]>('/menu/all');
}
