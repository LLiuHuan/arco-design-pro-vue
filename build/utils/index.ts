import path from 'path';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

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

export function getBuildTime() {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return dayjs.tz(Date.now(), 'Asia/Shanghai').format('YYYY-MM-DD HH:mm:ss');
}
