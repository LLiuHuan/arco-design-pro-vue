import { RouteLocationNormalized } from 'vue-router';

export interface GlobEnvConfig {
  // 标题
  VITE_GLOB_APP_TITLE: string;
  // 接口地址
  VITE_GLOB_API_URL: string;
  // 接口前缀
  VITE_GLOB_API_URL_PREFIX?: string;
  // Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  // 图片上传地址
  VITE_GLOB_UPLOAD_URL?: string;
  // 图片前缀地址
  VITE_GLOB_IMG_URL?: string;
}

// api config
export interface GlobConfig {
  title: string;
  apiUrl: string;
  shortName: string;
  urlPrefix?: string;
  uploadUrl?: string;
  imgUrl?: string;
}

// Tabs
export type RouteItem = Partial<RouteLocationNormalized> & {
  fullPath: string;
  name: string;
};

export interface IheaderSetting {
  fixed: boolean;
  isReload: boolean;
  headerHeight: string;
}

export interface ImenuSetting {
  minMenuWidth: number;
  menuWidth: number;
  fixed: boolean;
  mixMenu: boolean;
  collapsed: boolean;
}

// tabs
export interface ImultiTabsSetting {
  fixed: boolean;
  show: boolean;
}

export interface IcrumbsSetting {
  show: boolean;
  showIcon: boolean;
}
