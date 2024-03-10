/**
 * Independent time operation tool to facilitate subsequent switch to dayjs - [独立的时间操作工具，方便后续切换到dayjs]
 */
import dayjs from 'dayjs';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const DATE_FORMAT = 'YYYY-MM-DD';

export function formatToDateTime(
  date?: dayjs.ConfigType,
  format = DATE_TIME_FORMAT,
): string {
  return dayjs(date).format(format);
}

export function formatToDate(
  date?: dayjs.ConfigType,
  format = DATE_FORMAT,
): string {
  return dayjs(date).format(format);
}

export const dateUtil = dayjs;
