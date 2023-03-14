/**
 * 用于打包时生成其他配置文件。该文件可以配置一些全局变量，因此可以直接从外部更改，而无需重新打包
 */
import fs, { writeFileSync } from 'fs-extra';
import colors from 'picocolors';

import { getEnvConfig, getRootPath, getConfigFileName, GLOB_CONFIG_FILE_NAME } from '~/build';

import pkg from '../../package.json';

interface CreateConfigParams {
  configName: string;
  config: any;
  configFileName?: string;
}

function createConfig(params: CreateConfigParams) {
  const { configName, config, configFileName } = params;
  const OUTPUT_DIR = config.VITE_GLOB_BUILD_OUT_DIR || 'dist';
  try {
    const windowConf = `window.${configName}`;
    // Ensure that the variable will not be modified
    let configStr = `${windowConf}=${JSON.stringify(config)};`;
    configStr += `
      Object.freeze(${windowConf});
      Object.defineProperty(window, "${configName}", {
        configurable: false,
        writable: false,
      });
    `.replace(/\s/g, '');

    fs.mkdirp(getRootPath(OUTPUT_DIR));
    writeFileSync(getRootPath(`${OUTPUT_DIR}/${configFileName}`), configStr);

    console.log(colors.cyan(`✨ [${pkg.name}]`) + ` - configuration file is build successfully:`);
    console.log(colors.gray(OUTPUT_DIR + '/' + colors.green(configFileName)) + '\n');
  } catch (error) {
    console.log(colors.red('configuration file configuration file failed to package:\n' + error));
  }
}

export function runBuildConfig() {
  const config = getEnvConfig();
  const configFileName = getConfigFileName(config);
  createConfig({ config, configName: configFileName, configFileName: GLOB_CONFIG_FILE_NAME });
}
