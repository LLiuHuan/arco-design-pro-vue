import { TOKEN_KEY } from '@/enums';
import { localStg } from '@/utils';

// TODO: 获取token有问题
// const appStore = useAppStore();
// const isLocal =
//   appStore.getProjectConfig.permissionCacheType === CacheTypeEnum.LOCAL;

export function getToken() {
  return localStg.get(TOKEN_KEY) || '';
}
