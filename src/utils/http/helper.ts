import { isObject, isString } from '@/utils';

const DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

/**
 * @description: function is used to join timestamp to the request url - [函数用于将时间戳连接到请求 url]
 * @param join 是否拼接
 * @param restful 是否restful方式
 */
export function joinTimestamp<T extends boolean>(
  join: boolean,
  restful: T,
): T extends true ? string : object;

/**
 * @description: function is used to join timestamp to the request url - [函数用于将时间戳连接到请求 url]
 * @param join 是否拼接
 * @param restful 是否restful方式
 */
export function joinTimestamp(join: boolean, restful = false): string | object {
  if (!join) {
    return restful ? '' : {};
  }
  const now = new Date().getTime();
  if (restful) {
    return `?_t=${now}`;
  }
  return { _t: now };
}

/**
 * @description: Format request parameter time - [格式化请求参数时间]
 * @param params
 */
export function formatRequestDate(params: Recordable) {
  if (Object.prototype.toString.call(params) !== '[object Object]') {
    return;
  }

  for (const key in params) {
    if (Object.prototype.hasOwnProperty.call(params, key)) {
      const format = params[key]?.format ?? null;
      if (format && typeof format === 'function') {
        params[key] = params[key].format(DATE_TIME_FORMAT);
      }
      if (isString(key)) {
        const value = params[key];
        if (value) {
          try {
            params[key] = isString(value) ? value.trim() : value;
          } catch (error: any) {
            throw new Error(error);
          }
        }
      }
      if (isObject(params[key])) {
        formatRequestDate(params[key]);
      }
    }
  }
}
