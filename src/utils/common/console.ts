/**
 * @description Print log - [打印log]
 * @param message
 * @param optionalParams
 */
export function consoleLog(message?: any, ...optionalParams: any[]) {
  console.log(message, ...optionalParams);
}

/**
 * @description Print warn - [打印警告]
 * @param message
 * @param optionalParams
 */
export function consoleWarn(message?: any, ...optionalParams: any[]) {
  console.warn(message, ...optionalParams);
}

/**
 * @description Print error - [打印错误]
 * @param message
 * @param optionalParams
 */
export function consoleError(message?: any, ...optionalParams: any[]) {
  console.error(message, ...optionalParams);
}
