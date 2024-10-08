import { join } from 'node:path';

import dotenv from 'dotenv';
import * as fs from 'fs';

/**
 * 获取当前环境下生效的配置文件名
 */
function getConfFiles() {
  const script = process.env.npm_lifecycle_script as string;
  const reg = new RegExp('--mode ([a-z_\\d]+)');
  const result = reg.exec(script);
  if (result) {
    const mode = result[1];
    return ['.env', `.env.${mode}`];
  }
  return ['.env', '.env.production'];
}

/**
 * 获取以指定前缀开头的环境变量
 * @param match prefix
 * @param confFiles ext
 */
export function getEnvConfig(
  match = 'VITE_GLOB_',
  confFiles = getConfFiles(),
): {
  [key: string]: string;
} {
  let envConfig = {};

  for (const confFile of confFiles) {
    try {
      const envPath = fs.readFileSync(join(process.cwd(), confFile), {
        encoding: 'utf8',
      });
      const env = dotenv.parse(envPath);
      envConfig = { ...envConfig, ...env };
    } catch (e) {
      console.error(`Error in parsing ${confFile}`, e);
    }
  }
  const reg = new RegExp(`^(${match})`);
  Object.keys(envConfig).forEach((key) => {
    if (!reg.test(key)) {
      Reflect.deleteProperty(envConfig, key);
    }
  });
  return envConfig;
}
