import path from 'path';

/**
 * Get project root path - [获取项目根路径]
 * @descrition 末尾不带斜杠
 */
export function getRootPath() {
  return path.resolve(process.cwd());
}

/**
 * Get project src path - [获取项目src路径]
 * @param srcName - src目录名称(默认: "src")
 * @descrition 末尾不带斜杠
 */
export function getSrcPath(srcName = 'src') {
  const rootPath = getRootPath();

  return `${rootPath}/${srcName}`;
}
