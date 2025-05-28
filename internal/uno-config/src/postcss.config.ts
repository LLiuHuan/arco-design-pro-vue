/*
 * @Description: postcss 配置文件
 * @Author: LLiuHuan
 * @Date: 2025-05-08 09:36:16
 * @LastEditTime: 2025-05-16 18:00:21
 * @LastEditors: LLiuHuan
 */
// import config from '.';

export default {
  plugins: {
    ...(process.env.NODE_ENV === 'production' ? { cssnano: {} } : {}),
    // Specifying the config is not necessary in most cases, but it is included
    autoprefixer: {},
    // 修复 element-plus 和 ant-design-vue 的样式和tailwindcss冲突问题
    'postcss-antd-fixes': { prefixes: ['ant', 'el'] },
    'postcss-import': {},
    // 'postcss-preset-env': {},
    '@unocss/postcss': {},
    // 'postcss-pxtorem': {
    //   rootValue: 192, // 假设设计稿宽度为 1920px
    //   propList: ['*'],
    //   minPixelValue: 2, // 忽略小于 2px 的转换
    // },
  },
};
