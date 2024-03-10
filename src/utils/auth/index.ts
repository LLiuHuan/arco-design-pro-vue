import projectSetting from '@/settings/projectSetting';
import { CacheTypeEnum, TOKEN_KEY } from '@/enums';
import { localStg, sessionStg } from '@/utils';

const { permissionCacheType } = projectSetting;
const isLocal = permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return isLocal ? localStg.get(TOKEN_KEY) : sessionStg.get(TOKEN_KEY);
}
