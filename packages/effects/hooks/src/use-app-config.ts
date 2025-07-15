/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-27 12:01:59
 * @LastEditTime: 2025-07-15 01:53:31
 * @LastEditors: LLiuHuan
 */
import type {
  ApplicationConfig,
  ArcoDesignProAppConfigRaw,
} from '@arco/types/global';

/**
 * 由 vite-inject-app-config 注入的全局配置
 */
export function useAppConfig(
  env: Record<string, any>,
  isProduction: boolean,
): ApplicationConfig {
  // 生产环境下，直接使用 window._ARCO_DESIGN_PRO_APP_CONF_ 全局变量
  const config = isProduction
    ? window._ARCO_DESIGN_PRO_APP_CONF_
    : (env as ArcoDesignProAppConfigRaw);

  const { VITE_GLOB_API_URL } = config;

  return {
    apiURL: VITE_GLOB_API_URL,
  };
}
