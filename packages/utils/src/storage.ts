import localforage from 'localforage';
import { Crypto } from './crypto';

/** The storage type */
export type StorageType = 'local' | 'session';

const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7;

export interface StorageData<T> {
  value: T;
  expire: number | null;
}

// 十六位十六进制数作为密钥
const SECRET_KEY = '1101201190000001';
// 十六位十六进制数作为密钥偏移量
const SECRET_IV = '1000000911021011';

const crypto = new Crypto(SECRET_KEY, SECRET_IV);

export function createStorage<T extends object>(type: StorageType) {
  const stg = type === 'session' ? window.sessionStorage : window.localStorage;

  return {
    /**
     * Remove session
     * @param key
     */
    remove(key: keyof T) {
      stg.removeItem(key as string);
    },
    /**
     * Clear all session
     */
    clear() {
      stg.clear();
    },
    /**
     * Set session
     *
     * @param key Session key
     * @param value Session value
     * @param expire
     */
    set<K extends keyof T>(
      key: K,
      value: T[K],
      expire: number | null = DEFAULT_CACHE_TIME,
    ) {
      console.log('set', key, value, expire);
      const storageData: StorageData<T[K]> = {
        value,
        expire: expire !== null ? new Date().getTime() + expire * 1000 : null,
      };

      const json = crypto.encrypt(storageData);
      console.log(json, 'json', key, value, storageData);

      stg.setItem(key as string, json);
    },
    /**
     * Get session
     *
     * @param key Session key
     */
    get<K extends keyof T>(key: K): T[K] | null {
      const json = stg.getItem(key as string);
      console.log(key, json);
      if (json) {
        let storageData: StorageData<T[K]> | null = null;

        try {
          storageData = crypto.decrypt(json);
        } catch {
          /* empty */
        }
        console.info('storageData', storageData, json, key);
        if (storageData) {
          const { value, expire } = storageData;
          console.log(value, expire, 'value, expire');
          // 在有效期内直接返回
          if (expire === null || expire >= Date.now()) {
            return value as T[K];
          }
        }
      }
      stg.removeItem(key as string);
      return null;
    },
  };
}

type LocalForage<T extends object> = Omit<
  typeof localforage,
  'getItem' | 'setItem' | 'removeItem'
> & {
  getItem<K extends keyof T>(
    key: K,
    callback?: (err: any, value: T[K] | null) => void,
  ): Promise<T[K] | null>;

  setItem<K extends keyof T>(
    key: K,
    value: T[K],
    callback?: (err: any, value: T[K]) => void,
  ): Promise<T[K]>;

  removeItem(key: keyof T, callback?: (err: any) => void): Promise<void>;
};

type LocalforageDriver = 'local' | 'indexedDB' | 'webSQL';

export function createLocalforage<T extends object>(driver: LocalforageDriver) {
  const driverMap: Record<LocalforageDriver, string> = {
    local: localforage.LOCALSTORAGE,
    indexedDB: localforage.INDEXEDDB,
    webSQL: localforage.WEBSQL,
  };

  localforage.config({
    driver: driverMap[driver],
  });

  return localforage as LocalForage<T>;
}
