/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-23 10:41:46
 * @LastEditTime: 2024-08-23 14:58:55
 * @LastEditors: LLiuHuan
 */
import { AppEnum, AppEnumType } from '@/enums';

export const ThemeModeIconsTransition: AppEnumType = {
  [AppEnum.LIGHT]: 'line-md:moon-to-sunny-outline-loop-transition',
  // [AppEnum.LIGHT]: 'line-md:moon-to-sunny-outline-transition',
  [AppEnum.DARK]: 'line-md:sunny-outline-to-moon-loop-transition',
  // [AppEnum.DARK]: 'line-md:sunny-outline-to-moon-transition',
};

export const ThemeModeIcons: AppEnumType = {
  [AppEnum.LIGHT]: 'ic:outline-wb-sunny',
  [AppEnum.DARK]: 'ic:outline-nightlight',
  [AppEnum.AUTO]: 'ic:outline-hdr-auto',
};
