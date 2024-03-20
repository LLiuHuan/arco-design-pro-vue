/** 请求环境配置 */
type ServiceEnv = Record<EnvType, EnvConfig[]>;

/** 环境配置 */
const serviceEnvConfig: ServiceEnv = {
  dev: [
    {
      url: 'https://mock.apifox.com/m1/3402401-0-default/api/v1',
      proxy: '/mock',
    },
  ],
  test: [
    {
      url: 'http://localhost:8080',
      proxy: '/mock',
    },
  ],
  prod: [
    {
      url: 'http://localhost:8080',
      proxy: '/mock',
    },
  ],
};

/**
 * 获取环境配置
 * @param env 环境描述
 */
export const getEnvConfig = (env: ImportMetaEnv): EnvConfig[] => {
  const { VITE_ENV_TYPE = 'dev' } = env;

  switch (VITE_ENV_TYPE) {
    case 'dev':
      return serviceEnvConfig.dev;
    case 'test':
      return serviceEnvConfig.test;
    case 'prod':
      return serviceEnvConfig.prod;
    default:
      return serviceEnvConfig.dev;
  }
};
