import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import { getSrcPath } from '../../utils';

export const configSvgIconsPlugin = (viteEnv: ImportMetaEnv) => {
  const { VITE_ICON_LOCAL_PREFIX, command } = viteEnv;

  const srcPath = getSrcPath();
  const localIconPath = `${srcPath}/assets/icons`;

  return createSvgIconsPlugin({
    iconDirs: [localIconPath],
    svgoOptions: command === 'build',
    // default
    inject: 'body-last',
    symbolId: `${VITE_ICON_LOCAL_PREFIX ?? 'icon'}-[dir]-[name]`,
  });
};
