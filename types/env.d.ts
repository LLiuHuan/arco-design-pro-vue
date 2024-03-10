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
  /** 项目基本地址 */
  readonly VITE_GLOB_BASE_URL: string;
  /** 项目名称 */
  readonly VITE_GLOB_APP_TITLE: string;
  // endregion

  /** iconify图标作为组件的前缀 */
  readonly VITE_ICON_PREFIX: string;
  /**
   * 本地SVG图标作为组件的前缀, 请注意一定要包含 VITE_ICON_PREFIX
   * - 格式 {VITE_ICON_PREFIX}-{本地图标集合名称}
   * - 例如：icon-local
   */
  readonly VITE_ICON_LOCAL_PREFIX: string;

  /** Whether to enable analysis of packaged file size results - [是否开启打包文件大小结果分析] */
  readonly VITE_VISUALIZER?: 'Y' | 'N';
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
