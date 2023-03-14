// @ts-ignore
import dayjs from 'dayjs';

/** 项目构建时间 */
const PROJECT_BUILD_TIME = JSON.stringify(dayjs().format('YYYY-MM-DD HH:mm:ss'));

export const viteDefine = {
  PROJECT_BUILD_TIME,
  __VUE_I18N_FULL_INSTALL__: true,
  __VUE_I18N_LEGACY_API__: false,
  __INTLIFY_PROD_DEVTOOLS__: false,
};

export const GLOB_CONFIG_FILE_NAME = '_app.config.js';
