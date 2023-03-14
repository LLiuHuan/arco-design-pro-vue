/**
 * env环境类型
 * - dev: 后台开发环境
 * - test: 后台测试环境
 * - prod: 后台生产环境
 */
type EnvType = 'dev' | 'test' | 'prod';

/** env环境配置 */
interface EnvConfig {
  /** 后端的请求地址 */
  url: string;
  /** 代理标识, 用于拦截地址转发代理(如："/api"，这个和后端路径有无 "/api" 路径没有任何关系) */
  proxy: string;
}

interface ImportMetaEnv {
  /** 项目端口 */
  readonly VITE_PORT: number;
  /** 项目基本地址 */
  readonly VITE_BASE_URL: string;
  /** glob 项目名称 */
  readonly VITE_GLOB_APP_TITLE: string;
  /** glob 项目简称 */
  readonly VITE_GLOB_APP_SHORT_NAME: string;
  /** 项目描述 */
  readonly VITE_GLOB_APP_DESC: string;
  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: Exclude<
    AuthRoute.RoutePath,
    '/not-found-page' | '/:pathMatch(.*)*'
  >;
  /** vite环境类型 */
  readonly VITE_ENV_TYPE?: EnvType;
  /** 开启请求代理 */
  readonly VITE_HTTP_PROXY?: boolean;
  /** 是否开启打包文件大小结果分析 */
  readonly VITE_VISUALIZER: boolean;
  /** hash路由模式 */
  readonly VITE_HASH_ROUTE?: boolean;

  /** 是否禁用console */
  readonly VITE_DROP_CONSOLE: boolean;
  /** 项目打包路径 */
  readonly VITE_GLOB_BUILD_OUT_DIR: string;
  /** Api接口前缀 */
  readonly VITE_GLOB_API_URL_PREFIX: string;

  /** Mock开关 */
  readonly VITE_USE_MOCK: boolean;
  /** 是否开启打包压缩 */
  readonly VITE_BUILD_COMPRESS: 'gzip' | 'brotli' | 'none';
  /** 是否删除原始文件 */
  readonly VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE: boolean;
  /** 是否开启图片压缩 */
  readonly VITE_USE_IMAGEMIN: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
