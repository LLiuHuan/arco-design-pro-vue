import { intersectionWith, isEqual, mergeWith, unionWith } from 'lodash-es';

export {
  isArguments,
  isArrayBuffer,
  isArrayLike,
  isArrayLikeObject,
  isBuffer,
  isBoolean,
  isDate,
  isElement,
  isEmpty,
  isEqual,
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
  [K in TypeUtil.DataTypeStringKey]: TypeUtil.DataTypeString<K>;
} = {
  string: '[object String]',
  number: '[object Number]',
  boolean: '[object Boolean]',
  null: '[object Null]',
  undefined: '[object Undefined]',
  symbol: '[object Symbol]',
  bigInt: '[object BigInt]',
  object: '[object Object]',
  function: '[object Function]',
  array: '[object Array]',
  date: '[object Date]',
  regExp: '[object RegExp]',
  promise: '[object Promise]',
  set: '[object Set]',
  map: '[object Map]',
  file: '[object File]',
};

function getDataTypeString<K extends TypeUtil.DataTypeStringKey>(
  value: unknown,
) {
  return Object.prototype.toString.call(value) as TypeUtil.DataTypeString<K>;
}

export function isBigInt<T extends bigint>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.bigInt;
}

export function isObject<T extends Record<string, any>>(
  value: T | unknown,
): value is T {
  return getDataTypeString(value) === dataTypeLabels.object;
}

export function isArray<T extends any[]>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.array;
}

export function isPromise<T extends Promise<any>>(
  value: T | unknown,
): value is T {
  return getDataTypeString(value) === dataTypeLabels.promise;
}

export function isFile<T extends File>(value: T | unknown): value is T {
  return getDataTypeString(value) === dataTypeLabels.file;
}

/**
 * 判断是否 url
 * */
export function isUrl(url: string) {
  return /^(http|https):\/\//g.test(url);
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:|http?:)/.test(path);
}

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

export function isHttpUrl(path: string): boolean {
  const reg = /^http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?/;
  return reg.test(path);
}

// export function isNumber<T extends number>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.number;
// }
//
// export function isString<T extends string>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.string;
// }
//
// export function isBoolean<T extends boolean>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.boolean;
// }
//
// export function isNull<T extends null>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.null;
// }
//
// export function isUndefined<T extends undefined>(
//   value: T | unknown,
// ): value is T {
//   return getDataTypeString(value) === dataTypeLabels.undefined;
// }
//
// export function isSymbol<T extends symbol>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.symbol;
// }

// export function isFunction<T extends (...args: any[]) => any | void>(
//   value: T | unknown,
// ): value is T {
//   return getDataTypeString(value) === dataTypeLabels.function;
// }
//
// export function isDate<T extends Date>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.date;
// }
//
// export function isRegExp<T extends RegExp>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.regExp;
// }
//
// export function isSet<T extends Set<any>>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.set;
// }
//
// export function isMap<T extends Map<any, any>>(value: T | unknown): value is T {
//   return getDataTypeString(value) === dataTypeLabels.map;
// }
