import { CacheTypeEnum, TOKEN_KEY } from '@/enums';
import { localStg, sessionStg } from '@/utils/cache';
import { appSetting } from '@/settings';
import { StorageInterface } from '~/types/storage';

const { permissionCacheType } = appSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export const getAuthCache = <T>(key: StorageInterface.BasicKeys) => {
  const fn = isLocal ? localStg.get : sessionStg.get;
  return fn(key) as T;
};

export const setAuthCache = (key: StorageInterface.BasicKeys, value: any) => {
  return isLocal ? localStg.set(key, value) : sessionStg.set(key, value);
};

export function getToken() {
  return getAuthCache(TOKEN_KEY) || '';
}
