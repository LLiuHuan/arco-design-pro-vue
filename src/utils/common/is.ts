import {
  intersectionWith,
  isEqual,
  mergeWith,
  unionWith,
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqualWith,
  isError,
  isFunction,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNumber,
  isNull,
  isObject,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
} from 'lodash-es';

export const dataTypeLabels: {
  [K in TypeUtil.TypeStringKey]: TypeUtil.TypeString<K>;
} = {
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  bigInt: '[object BigInt]',
  regExp: '[object RegExp]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]',
  promise: '[object Promise]',
};

function getTag<K extends TypeUtil.TypeStringKey>(value: unknown) {
  return Object.prototype.toString.call(value) as TypeUtil.TypeString<K>;
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getTag(value) === dataTypeLabels.bigInt;
}

export function isPromise<T extends Promise<any>>(
  value: T | unknown,
): value is T {
  return getTag(value) === dataTypeLabels.promise;
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getTag(value) === dataTypeLabels.file;
}

/**
 * @description 判断是否为 url
 * */
export function isUrl(url: string) {
  return /^(http|https):\/\//g.test(url);
}

/**
 * @description 判断是否为 http url
 * @param path
 */
export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

/**
 * @description 判断是否为外部链接
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:|http?:)/.test(path);
}

export const isServer = typeof window === 'undefined';

export const isClient = !isServer;

/**
 * Recursively merge two objects.
 * 递归合并两个对象。
 *
 * @param source The source object to merge from. 要合并的源对象。
 * @param target The target object to merge into. 目标对象，合并后结果存放于此。
 * @param mergeArrays How to merge arrays. Default is "replace".
 *        如何合并数组。默认为replace。
 *        - "union": Union the arrays. 对数组执行并集操作。
 *        - "intersection": Intersect the arrays. 对数组执行交集操作。
 *        - "concat": Concatenate the arrays. 连接数组。
 *        - "replace": Replace the source array with the target array. 用目标数组替换源数组。
 * @returns The merged object. 合并后的对象。
 */
export function deepMerge<
  T extends object | null | undefined,
  U extends object | null | undefined,
>(
  source: T,
  target: U,
  mergeArrays: 'union' | 'intersection' | 'concat' | 'replace' = 'replace',
): T & U {
  if (!target) {
    return source as T & U;
  }
  if (!source) {
    return target as T & U;
  }
  return mergeWith({}, source, target, (sourceValue, targetValue) => {
    if (isArray(targetValue) && isArray(sourceValue)) {
      switch (mergeArrays) {
        case 'union':
          return unionWith(sourceValue, targetValue, isEqual);
        case 'intersection':
          return intersectionWith(sourceValue, targetValue, isEqual);
        case 'concat':
          return sourceValue.concat(targetValue);
        case 'replace':
          return targetValue;
        default:
          throw new Error(
            `Unknown merge array strategy: ${mergeArrays as string}`,
          );
      }
    }
    if (isObject(targetValue) && isObject(sourceValue)) {
      return deepMerge(sourceValue, targetValue, mergeArrays);
    }
    return undefined;
  });
}

export {
  intersectionWith,
  isEqual,
  mergeWith,
  unionWith,
  isArguments,
  isArray,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqualWith,
  isError,
  isFunction,
  isFinite,
  isLength,
  isMap,
  isMatch,
  isMatchWith,
  isNative,
  isNil,
  isNumber,
  isNull,
  isObject,
  isObjectLike,
  isPlainObject,
  isRegExp,
  isSafeInteger,
  isSet,
  isString,
  isSymbol,
  isTypedArray,
  isUndefined,
  isWeakMap,
  isWeakSet,
};
