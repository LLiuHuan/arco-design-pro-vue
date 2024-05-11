import { ThemeColorEnum } from '@/enums';
import { useRootSetting } from '@/hooks/setting';
import { ThemeInfo, ThemeSetting } from '~/types/config';
import { setProTheme } from '@/utils/common';

const { setThemeColor } = useRootSetting();

const themes: ThemeInfo[] = [
  {
    author: 'LLiuHuan',
    logo: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3bbf8d8d402242e2a5fe92e7a803033d~tplv-uwbnlip3yd-image.image',
    themeName: '🎅 Merry Christmas',
    description: 'Merry Christmas 🎅🎅🎅🎅🎄🎄🎄🎄',
    packageName: '@arco-themes/vue-theme-christmas',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#19461F',
      [ThemeColorEnum.SUCCESS]: '#105157',
      [ThemeColorEnum.WARNING]: '#FFB057',
      [ThemeColorEnum.ERROR]: '#9A0502',
    },
  },
  {
    author: 'LLiuHuan',
    logo: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/69cba36cc4874e24833ba46303a1da65~tplv-uwbnlip3yd-image.image',
    themeName: '🧨 Happy New Year ',
    description: 'Happy New Year 🧨🧨🧨',
    packageName: '@arco-themes/vue-new-year',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#C3272B',
      [ThemeColorEnum.SUCCESS]: '#6F8657',
      [ThemeColorEnum.WARNING]: '#F2BE45',
      [ThemeColorEnum.ERROR]: '#F53F3F',
    },
  },
  {
    author: 'vaevie',
    themeName: '小程序管理平台',
    packageName: '@arco-themes/vue-taolu-publishing-platform',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#07C160',
      [ThemeColorEnum.SUCCESS]: '#07C160',
      [ThemeColorEnum.WARNING]: '#FFC300',
      [ThemeColorEnum.ERROR]: '#FA5151',
    },
  },
  {
    author: 'hongbiangoal',
    logo: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/044dd8ddb8cc44b48074cf117d60c7e8~tplv-uwbnlip3yd-image.image',
    themeName: 'H3C-Router',
    description: '',
    packageName: '@arco-themes/vue-h3c-router',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#2A50D7',
      [ThemeColorEnum.SUCCESS]: '#22835A',
      [ThemeColorEnum.WARNING]: '#E37318',
      [ThemeColorEnum.ERROR]: '#CA483E',
    },
  },
  {
    author: 'zhaoweizhong',
    themeName: 'Mengtu Pink Vue',
    description: '',
    packageName: '@arco-themes/vue-mengtu',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#FE82A5',
      [ThemeColorEnum.SUCCESS]: '#00B42A',
      [ThemeColorEnum.WARNING]: '#FF7D00',
      [ThemeColorEnum.ERROR]: '#F53F3F',
    },
  },
  {
    author: '926m',
    description: '橙色主题',
    themeName: 'hst-OEM运营后台-代理商后台',
    packageName: '@arco-themes/vue-hst-oem',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#FF3434',
      [ThemeColorEnum.SUCCESS]: '#00B42A',
      [ThemeColorEnum.WARNING]: '#FF9047',
      [ThemeColorEnum.ERROR]: '#F53F3F',
    },
  },
  {
    author: '0Yinchen0',
    logo: '//p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/9f4ae28502254c42a644ec26e76c51f7~tplv-uwbnlip3yd-image.image',
    description: 'genki',
    themeName: 'genki',
    packageName: '@arco-themes/vue-genki-theme',
    depLibrary: '@arco-design/web-vue',
    colors: {
      [ThemeColorEnum.PRIMARY]: '#F3B02C',
      [ThemeColorEnum.SUCCESS]: '#00B42A',
      [ThemeColorEnum.WARNING]: '#FF7D00',
      [ThemeColorEnum.ERROR]: '#F53F3F',
    },
  },
];

export const getThemes = (
  page: number,
  pageSize: number,
): {
  data: ThemeInfo[];
  total: number;
} => {
  return {
    data: themes.slice((page - 1) * pageSize, page * pageSize),
    total: themes.length,
  };
};

export const setThemeInfo = async (theme: string, colors: ThemeSetting) => {
  await setProTheme(theme);

  Object.keys(colors).forEach((key: ThemeColorEnum) => {
    setThemeColor(key, colors[key]);
  });
};
