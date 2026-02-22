/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-02-22 17:59:53
 * @LastEditors: LLiuHuan
 */
import { requestClient } from '#/api/request';
import type { RouteRecordStringComponent } from '@qin/types';

const MENU_BASE_URL = '/menu';

const MenuAPI = {
  /**
   * 获取用户所有菜单
   */
  async getMenusApi() {
    return requestClient.get<RouteRecordStringComponent[]>(
      `${MENU_BASE_URL}/all`,
    );
  },
};

export default MenuAPI;
