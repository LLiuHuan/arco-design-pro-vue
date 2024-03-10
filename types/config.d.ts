import { CacheTypeEnum } from '@/enums';

export type LocaleType = 'zh_CN' | 'en' | 'ru' | 'ja' | 'ko';

export interface GlobEnvConfig {
  // Site title
  VITE_GLOB_APP_TITLE: string;
  // Service interface url
  VITE_GLOB_API_URL: string;
  // Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // Upload url
  VITE_GLOB_UPLOAD_URL?: string;
  // Site title
  VITE_GLOB_APP_TITLE_SHORT?: string;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface ProjectConfig {
  // Storage location of permission related information - [权限相关信息的存储位置]
  permissionCacheType: CacheTypeEnum;
  // Use error-handler-plugin - [显示错误处理插件]
  useErrorHandle: boolean;
}
