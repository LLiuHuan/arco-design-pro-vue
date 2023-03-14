type minify = boolean | 'terser' | 'esbuild';

/**
 * Vite Build Config
 * @param env
 */
export function createViteBuild(env: ImportMetaEnv) {
  const minify = env.VITE_DROP_CONSOLE && ('terser' as minify);
  return {
    // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'，这是指 支持原生 ES 模块的浏览器。
    target: 'es2015',
    // 此选项允许用户为 CSS 的压缩设置一个不同的浏览器 target，此处的 target 并非是用于 JavaScript 转写目标。
    minify,
    // 应只在针对非主流浏览器时使用。
    cssTarget: 'chrome80',
    // 指定输出路径（相对于 项目根目录).
    outDir: env.VITE_GLOB_BUILD_OUT_DIR || 'dist',
    // 指定生成静态资源的存放路径（相对于 build.outDir）。
    assetsDir: 'assets',
    // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
    assetsInlineLimit: 40960,
    terserOptions: {
      compress: {
        keep_infinity: true,
        drop_console: env.VITE_DROP_CONSOLE,
      },
    },
    // 启用/禁用 brotli 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
    brotliSize: false,
    // chunk 大小警告的限制（以 kbs 为单位）。
    chunkSizeWarningLimit: 2000,
  };
}
