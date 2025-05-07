/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-23 09:56:22
 * @LastEditors: LLiuHuan
 */
import type { ProjectConfig } from '~/types/config';
import { localStg } from '@/utils/cache';
import { PROJ_CFG_KEY } from '@/enums';
import { appSetting } from '@/settings';
import { cloneDeep } from 'lodash-es';
import { isProdMode } from '@/utils/envs';

export const initAppSetting = (): ProjectConfig => {
  // 生产环境才缓存主题配置，本地开发实时调整配置更改配置的json
  const storageSettings = localStg.get(PROJ_CFG_KEY);

  if (isProdMode() && storageSettings) {
    // if (storageSettings) {
    return storageSettings;
  }

  return cloneDeep(appSetting);
};
