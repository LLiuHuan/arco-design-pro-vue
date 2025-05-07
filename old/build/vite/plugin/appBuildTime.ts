import type { Plugin } from 'vite';

/**
 * @description 设置html插件（打包时间）
 * @description Set up the html plugin
 *
 * @param {string} buildTime
 */
export function setupHtmlPlugin(buildTime: string) {
  const plugin: Plugin = {
    name: 'html-plugin',
    apply: 'build',
    transformIndexHtml(html) {
      return html.replace(
        '<head>',
        `<head>\n    <meta name="buildTime" content="${buildTime}">`,
      );
    },
  };

  return plugin;
}
