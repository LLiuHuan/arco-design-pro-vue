import pkg from '~/package.json';
import { GlobEnvConfig } from '~/types/config';
import { API_ADDRESS } from '@/enums';

/**
 * @description: 是否是开发模式
 * @description: Is it a development mode
 * @returns:
 * @example:
 */
export function isDevMode(): boolean {
  return import.meta.env.DEV;
}

/**
 * @description 是否是生产模式
 * @description: Is it a production mode
 * @returns:
 */
export function isProdMode(): boolean {
  return import.meta.env.PROD;
}

/**
 * @description: Get environment variables - [获取环境变量]
 * @returns:
 * @example:
 */
export function getEnv(): string {
  return import.meta.env.MODE;
}

/**
 * @description: Get environment variables - [获取环境变量]
 * @param title
 */
const getVariableName = (title: string) => {
  function strToHex(str: string) {
    const result: string[] = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < str.length; ++i) {
      const hex = str.charCodeAt(i).toString(16);
      result.push(`000${hex}`.slice(-4));
    }
    return result.join('').toUpperCase();
  }

  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

/**
 * @description Get environment variables - [获取环境变量]
 */
export function getAppEnvConfig() {
  const ENV_NAME: any = getVariableName(import.meta.env.VITE_GLOB_APP_TITLE);
  const ENV = isDevMode()
    ? // Get the global configuration (the configuration will be extracted independently when packaging)
      (import.meta.env as unknown as GlobEnvConfig)
    : (window[ENV_NAME] as unknown as GlobEnvConfig);
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = ENV;
  let { VITE_GLOB_API_URL } = ENV;
  if (localStorage.getItem(API_ADDRESS)) {
    const address = JSON.parse(localStorage.getItem(API_ADDRESS) || '{}');
    if (address?.key) VITE_GLOB_API_URL = address?.val;
  }
  return {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
}

/**
 * @description Generate cache key according to version - [根据版本生成缓存键]
 */
export function getCommonStoragePrefix() {
  const { VITE_GLOB_APP_TITLE } = getAppEnvConfig();
  return `${VITE_GLOB_APP_TITLE.replace(/\s/g, '_')}__${getEnv()}`.toUpperCase();
}

/**
 * @description Generate cache key according to version - [根据版本生成缓存键]
 */
export function getStorageShortName() {
  return `${getCommonStoragePrefix()}${`__${pkg.version}`}__`.toUpperCase();
}
