import { GlobEnvConfig } from '~/types/config';
import { getAppEnvConfig } from '@/utils/envs';

/**
 * @description 获取全局配置
 * @description Get global configuration
 */
export const useGlobSetting = (): Readonly<GlobEnvConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobEnvConfig> = {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_APP_SHORT_TITLE: VITE_GLOB_APP_TITLE.replace(/\s/g, '_').replace(
      /-/g,
      '_',
    ),
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobEnvConfig>;
};
