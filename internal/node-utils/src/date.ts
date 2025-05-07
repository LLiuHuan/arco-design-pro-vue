/*
 * @Description: 导出dayjs
 * @Author: LLiuHuan
 * @Date: 2025-05-07 15:34:47
 * @LastEditTime: 2025-05-07 15:47:15
 * @LastEditors: LLiuHuan
 */

import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault('Asia/Shanghai');

const dateUtil = dayjs;

export { dateUtil };
