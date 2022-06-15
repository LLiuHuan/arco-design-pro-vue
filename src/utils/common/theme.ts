import { EnumStorageKey } from '@/enums';
import { storage } from '@/utils/storage/storage';

/**
 * 缓存主题颜色
 * @param color
 */
export function setThemeColor(color: string) {
  storage.set(EnumStorageKey['theme-color'], color);
}

/**
 * 获取缓存的主题颜色
 */
export function getThemeColor() {
  return storage.get(EnumStorageKey['theme-color']);
}
