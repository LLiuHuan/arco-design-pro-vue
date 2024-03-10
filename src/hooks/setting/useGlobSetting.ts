import { getAppEnvConfig } from '@/utils';
import { GlobEnvConfig } from '~/types/config';

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
    VITE_GLOB_APP_TITLE_SHORT: VITE_GLOB_APP_TITLE.replace(/\s/g, '_').replace(
      /-/g,
      '_',
    ),
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobEnvConfig>;
};
