import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import path from 'path';

export const configSvgIconsPlugin = (isBuild: boolean) => {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    svgoOptions: isBuild,
    // default
    symbolId: 'icon-[dir]-[name]',
  });
};
