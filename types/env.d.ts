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
  // region GLOB打包后会生成到_app.config.js文件中，用于项目打包后需要可以支持动态配置的场景
  // // Site title
  // VITE_GLOB_APP_TITLE: string;
  // // Service interface url
  // VITE_GLOB_API_URL: string;
  // // Service interface url prefix
  // VITE_GLOB_API_URL_PREFIX?: string;
  // // Upload url
  // VITE_GLOB_UPLOAD_URL?: string;
  // // Site title
  // VITE_GLOB_APP_TITLE_SHORT?: string;

  /** 项目基本地址 */
  readonly VITE_GLOB_BASE_URL: string;
  /** 项目接口地址 apiUrl */
  readonly VITE_GLOB_API_URL: string;
  /** 项目接口前缀 */
  readonly VITE_GLOB_API_URL_PREFIX: string;
  /** Project name - [项目名称] */
  readonly VITE_GLOB_APP_TITLE: string;
  /** Project abbreviation - [项目简称] */
  readonly VITE_GLOB_APP_SHORT_NAME: string;
  // endregion

  /** iconify icon as prefix for component - [iconify图标作为组件的前缀] */
  readonly VITE_ICON_PREFIX: string;
  /**
   * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
   * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
   * - 例如：icon-local
   */
  readonly VITE_ICON_LOCAL_PREFIX: string;

  /** Whether to enable analysis of packaged file size results - [是否开启打包文件大小结果分析] */
  readonly VITE_VISUALIZER?: 'Y' | 'N';
  /** Whether to enable packaging and compression - [是否开启打包压缩] */
  readonly VITE_COMPRESS?: 'Y' | 'N';
  /** Compression algorithm type - [压缩算法类型] */
  readonly VITE_COMPRESS_TYPE?:
    | 'gzip'
    | 'brotliCompress'
    | 'deflate'
    | 'deflateRaw';
  /** Whether to delete the original file after compression - [压缩后是否删除原文件] */
  readonly VITE_COMPRESS_DELETE_ORIGIN_FILE?: 'Y' | 'N';
  /** Whether to enable preview - [是否开启预览] */
  readonly VITE_OPEN_PREVIEW?: 'Y' | 'N';
  /** Whether to apply pwa - [是否应用pwa] */
  readonly VITE_PWA?: 'Y' | 'N';
  /** Whether it is deployed vercel - [是否是部署的vercel] */
  readonly VITE_VERCEL?: 'Y' | 'N';
  /** Whether to enable image compression - [是否开启图片压缩] */
  readonly VITE_IMAGEMIN?: 'Y' | 'N';
  /** Whether to delete CONSOLE printing - [是否删除CONSOLE打印] */
  readonly VITE_DROP_CONSOLE?: 'Y' | 'N';

  /** Whether to enable HASH mode routing plugin - [是否开启HASH模式路由插件] */
  readonly VITE_HASH_ROUTE?: 'Y' | 'N';

  /**
   * 权限路由模式:
   * - static - 前端声明的静态
   * - dynamic - 后端返回的动态
   */
  readonly VITE_AUTH_ROUTE_MODE: 'static' | 'dynamic';
  /** 路由首页的路径 */
  readonly VITE_ROUTE_HOME_PATH: import('@elegant-router/types').LastLevelRouteKey;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
