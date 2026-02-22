/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-15 23:01:48
 * @LastEditTime: 2026-02-22 17:59:27
 * @LastEditors: LLiuHuan
 */
import { requestClient } from '#/api/request';
import type { UserInfo } from '@qin/types';

const USER_BASE_URL = '/user';

const UserAPI = {
  /**
   * 获取用户信息
   */
  async getUserInfoApi() {
    return requestClient.get<UserInfo>(`${USER_BASE_URL}/info`);
  },
};

export default UserAPI;
