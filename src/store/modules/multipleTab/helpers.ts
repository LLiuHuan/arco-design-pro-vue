import { localStg } from '@/utils/cache';
import { MULTIPLE_TABS_KEY } from '@/enums';

/** 清空多页签数据 */
export function clearTabRoutes() {
  localStg.set(MULTIPLE_TABS_KEY, []);
}
