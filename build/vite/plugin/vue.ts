/**
 * @description Vue基础插件
 */

import vue from '@vitejs/plugin-vue';
// import vueJsx from "@vitejs/plugin-vue-jsx";

export const configVuePlugin = () => {
  return [vue()];
  // return [vue(), vueJsx()];
};
