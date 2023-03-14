import type { ProxyOptions } from 'vite';

const httpsRE = /^https:\/\//;

/**
 * 设置网络代理
 * @param isOpenProxy - 是否开启代理
 * @param envConfigs - env环境配置
 */
export function createViteProxy(isOpenProxy: boolean, envConfigs: EnvConfig[] = []) {
  if (!isOpenProxy) return undefined;

  const ret: Record<string, string | ProxyOptions> = {};

  for (const env of envConfigs) {
    const isHttps = httpsRE.test(env.url);
    ret[env.proxy] = {
      target: env.url,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${env.proxy}`), ''),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  // 代理github
  ret['/g'] = {
    target: 'https://github.com',
    changeOrigin: true,
    rewrite: (path) => path.replace(/g/, ''),
  };
  return ret;
}
