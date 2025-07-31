/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-07-31 22:39:13
 * @LastEditTime: 2025-08-01 04:54:08
 * @LastEditors: LLiuHuan
 */

import { requestClient } from '../request';

const BIGINT_BASE_URL = '/bigint';

const BigIntAPI = {
  bigint() {
    return requestClient.get(`${BIGINT_BASE_URL}`);
  },
};

export default BigIntAPI;
