import { isDevMode } from '@/utils';

/**
 * @description System default cache time, in seconds - [系统默认缓存时间，单位秒]
 */
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

/**
 * @description aes encryption key - [aes加密密钥]
 */
export const cacheCipher = {
  key: '_1101201190000001',
  iv: '1101201190000001_',
};

/**
 * @description Whether the system cache is encrypted using aes - [系统缓存是否使用aes加密]
 */
export const SHOULD_ENABLE_STORAGE_ENCRYPTION = !isDevMode();
