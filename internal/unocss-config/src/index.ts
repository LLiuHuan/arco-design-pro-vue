/*
 * @Description: unocss配置
 * @Author: LLiuHuan
 * @Date: 2025-05-07 16:16:41
 * @LastEditTime: 2025-05-19 02:51:06
 * @LastEditors: LLiuHuan
 */

// import { createRemToPxProcessor } from '@unocss/preset-wind4/utils';
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetWebFonts,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss';

// const BASE_FONT_SIZE = 4;

export default defineConfig({
  presets: [
    presetWind4({
      // preflights: {
      //   theme: {
      //     process: createRemToPxProcessor(BASE_FONT_SIZE),
      //   },
      // },
    }),
    presetAttributify(),
    presetIcons({
      // prefix: 'i-',
      // scale: 1.2,
      // warn: true,
      // extraProperties: {
      //   display: 'inline-block',
      //   'vertical-align': 'middle',
      // },
    }),
    presetTypography(),
    presetWebFonts({
      provider: 'none',
      fonts: {
        script: 'Homemade Apple',
      },
    }),
  ],
  shortcuts: {
    'flex-center': 'flex justify-center items-center',
    'flex-x-center': 'flex justify-center',
    'flex-y-center': 'flex items-center',
    'flex-x-between': 'flex items-center justify-between',
    'flex-x-end': 'flex items-center justify-end',
    'wh-full': 'w-full h-full',
    'text-truncate': 'whitespace-nowrap overflow-hidden text-ellipsis',
    'bg-no-repeat-contain': 'bg-no-repeat bg-contain',
    'bg-no-repeat-cover': 'bg-no-repeat bg-cover',
    'abs-full': 'absolute left-0 right-0 top-0 bottom-0',
    'abs-x-center': 'absolute left-50% top-0 translate-x--1/2',
    'abs-y-center': 'absolute left-0 top-50% translate-y--1/2',
    'abs-center': 'absolute left-50% top-50% translate-x--1/2 translate-y--1/2',
  },
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
