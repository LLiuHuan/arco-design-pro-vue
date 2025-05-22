/*
 * @Description: unocss vite 插件
 * @Author: LLiuHuan
 * @Date: 2025-05-07 17:46:46
 * @LastEditTime: 2025-05-07 18:00:27
 * @LastEditors: LLiuHuan
 */
import unocss from 'unocss/vite';
// import presetIcons from '@unocss/preset-icons';

export const viteUnocssPlugin = () => {
  return unocss({
    // presets: [
    //   presetIcons({
    //     prefix: `${VITE_ICON_PREFIX}-`,
    //     scale: 1,
    //     extraProperties: {
    //       display: 'inline-block'
    //     },
    //     collections: {
    //       [collectionName]: FileSystemIconLoader(localIconPath, svg =>
    //         svg.replace(/^<svg\s/, '<svg width="1em" height="1em" ')
    //       )
    //     },
    //     warn: true
    //   })
    // ]
  });
};
