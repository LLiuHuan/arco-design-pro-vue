import type { ProjectConfig } from '~/types/config';
import { localStg } from '@/utils/cache';
import { PROJ_CFG_KEY } from '@/enums';
import { appSetting } from '@/settings';
import { cloneDeep } from 'lodash-es';

export const initAppSetting = (): ProjectConfig => {
  const isProd = import.meta.env.PROD;
  // 生产环境才缓存主题配置，本地开发实时调整配置更改配置的json
  const storageSettings = localStg.get(PROJ_CFG_KEY);

  if (isProd && storageSettings) {
    // if (storageSettings) {
    return storageSettings;
  }

  return cloneDeep(appSetting);
};
