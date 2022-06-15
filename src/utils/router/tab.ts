import { EnumStorageKey } from '@/enums';
import { storage } from '@/utils/storage/storage';

/** 缓存多页签数据 */
export function setTabRoutes(data: GlobalTabRoute[]) {
  storage.set(EnumStorageKey['tab-routes'], data);
}

/** 获取缓存的多页签数据 */
export function getTabRoutes() {
  return storage.get<GlobalTabRoute[]>(EnumStorageKey['tab-routes']);
}

/** 清空多页签数据 */
export function clearTabRoutes() {
  setTabRoutes([]);
}
