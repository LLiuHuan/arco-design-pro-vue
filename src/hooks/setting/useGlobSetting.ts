import { GlobEnvConfig } from '~/types/config';
import { getAppEnvConfig } from '@/utils/envs';

export const useGlobSetting = (): Readonly<GlobEnvConfig> => {
  const {
    VITE_GLOB_APP_TITLE,
    VITE_GLOB_API_URL,
    VITE_GLOB_API_URL_PREFIX,
    VITE_GLOB_UPLOAD_URL,
  } = getAppEnvConfig();

  // Take global configuration
  const glob: Readonly<GlobEnvConfig> = {
    title: VITE_GLOB_APP_TITLE,
    apiUrl: VITE_GLOB_API_URL,
    shortTitle: VITE_GLOB_APP_TITLE.replace(/\s/g, '_').replace(/-/g, '_'),
    apiUrlPrefix: VITE_GLOB_API_URL_PREFIX,
    uploadUrl: VITE_GLOB_UPLOAD_URL,
  };
  return glob as Readonly<GlobEnvConfig>;
};
