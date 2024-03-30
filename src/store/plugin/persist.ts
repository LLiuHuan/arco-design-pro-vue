/**
 * Pinia Persist Plugin
 * Pinia 持久化插件
 * @link https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/
 *
 */
import type { Pinia } from 'pinia';
import { createPersistedState, Serializer } from 'pinia-plugin-persistedstate';
import type { PersistedStateFactoryOptions } from 'pinia-plugin-persistedstate';
import { cacheCipher, SHOULD_ENABLE_STORAGE_ENCRYPTION } from '@/settings';
import { getCommonStoragePrefix } from '@/utils/envs';
import { Encryption, EncryptionFactory } from '@/utils/common';

export const PERSIST_KEY_PREFIX = getCommonStoragePrefix();

const persistEncryption: Encryption = EncryptionFactory.createAesEncryption({
  key: cacheCipher.key,
  iv: cacheCipher.iv,
});

/**
 * @description Custom serializer for serialization and deserialization of storage data - [自定义序列化器，用于序列化和反序列化存储数据]
 *
 * @param shouldEnableEncryption whether to enable encryption for storage data 是否启用存储数据加密
 * @returns serializer
 */
function customSerializer(shouldEnableEncryption: boolean): Serializer {
  if (shouldEnableEncryption) {
    return {
      deserialize: (value: any) => {
        const decrypted = persistEncryption.decrypt(value);
        return JSON.parse(decrypted);
      },
      serialize: (value: any) => {
        const serialized = JSON.stringify(value);
        return persistEncryption.encrypt(serialized);
      },
    };
  }
  return {
    deserialize: (value: any) => {
      return JSON.parse(value);
    },
    serialize: (value: any) => {
      return JSON.stringify(value);
    },
  };
}

/**
 * @description Create Persisted State Options - [创建持久化状态选项]
 *
 * @param keyPrefix prefix for storage key 储存键前缀
 * @returns persisted state factory options
 */
export function createPersistedStateOptions(
  keyPrefix: string,
): PersistedStateFactoryOptions {
  return {
    storage: localStorage,
    key: (id: any) => `${keyPrefix}__${id}`,
    serializer: customSerializer(SHOULD_ENABLE_STORAGE_ENCRYPTION),
  };
}

/**
 * @description Register Pinia Persist Plugin - [注册 Pinia 持久化插件]
 *
 * @param pinia Pinia instance Pinia 实例
 */
export function registerPiniaPersistPlugin(pinia: Pinia) {
  console.log(PERSIST_KEY_PREFIX, 'PERSIST_KEY_PREFIX');
  pinia.use(
    createPersistedState(createPersistedStateOptions(PERSIST_KEY_PREFIX)),
  );
}
