// @ts-ignore
import viteImagemin from 'vite-plugin-imagemin';

/**
 * 压缩图片
 * https://github.com/anncwb/vite-plugin-imagemin
 */
export function configImageminPlugin() {
  return viteImagemin({
    gifsicle: {
      optimizationLevel: 7,
      interlaced: false,
    },
    optipng: {
      optimizationLevel: 7,
    },
    mozjpeg: {
      quality: 20,
    },
    pngquant: {
      quality: [0.8, 0.9],
      speed: 4,
    },
    svgo: {
      plugins: [
        {
          name: 'removeViewBox',
        },
        {
          name: 'removeEmptyAttrs',
          active: false,
        },
      ],
    },
  });
}
