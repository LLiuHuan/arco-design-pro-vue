import { PluginOption } from 'vite';
import colors from 'picocolors';
import { createContentHash, strToHex } from '../utils/hash';
import { getEnvConfig } from '../utils/env';
import pkg from '../../../package.json';

const GLOBAL_CONFIG_FILE_NAME = '_app.config.js';
const PLUGIN_NAME = 'app-config';

/**
 * Get the configuration file variable name
 * @param title
 */
const getVariableName = (title: string) => {
  return `__PRODUCTION__${strToHex(title) || '__APP'}__CONF__`
    .toUpperCase()
    .replace(/\s/g, '');
};

function getConfigSource(appTitle: string) {
  const config = getEnvConfig();
  const variableName = getVariableName(appTitle);
  const windowVariable = `window.${variableName}`;
  // Ensure that the variable will not be modified
  let source = `${windowVariable}=${JSON.stringify(config)};`;
  source += `
    Object.freeze(${windowVariable});
    Object.defineProperty(window, "${variableName}", {
      configurable: false,
      writable: false,
    });
  `.replace(/\s/g, '');
  return source;
}

interface CreateAppConfigPluginOptions {
  isBuild: boolean;
}

function createAppConfigPlugin({
  isBuild,
}: CreateAppConfigPluginOptions): PluginOption {
  let publicPath: string;
  let source: string;
  if (!isBuild) {
    return {
      name: PLUGIN_NAME,
    };
  }
  const { version } = pkg;

  return {
    name: PLUGIN_NAME,
    configResolved(_config) {
      const appTitle = _config?.env?.VITE_GLOB_APP_TITLE ?? '';
      // appTitle = appTitle.replace(/\s/g, '_').replace(/-/g, '_');
      publicPath = _config.base;
      source = getConfigSource(appTitle);
    },
    transformIndexHtml(html) {
      publicPath = publicPath.endsWith('/') ? publicPath : `${publicPath}/`;

      const appConfigSrc = `${
        publicPath || '/'
      }${GLOBAL_CONFIG_FILE_NAME}?v=${version}-${createContentHash(source)}`;

      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: {
              src: appConfigSrc,
            },
          },
        ],
      };
    },
    generateBundle() {
      try {
        this.emitFile({
          type: 'asset',
          fileName: GLOBAL_CONFIG_FILE_NAME,
          source,
        });
        console.log(
          colors.cyan(`\n✨configuration file is build successfully!\n`),
        );
      } catch (error) {
        console.log(
          colors.red(
            `configuration file configuration file failed to package:\n${error}`,
          ),
        );
      }
    },
  };
}

export { createAppConfigPlugin };
