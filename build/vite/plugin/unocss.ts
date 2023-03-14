import unocss from 'unocss/vite';
import { presetAttributify, presetIcons, presetUno } from 'unocss';

export const configUnocssPlugin = () => {
  return unocss({
    presets: [presetUno(), presetAttributify(), presetIcons()],
    rules: [],
  });
};
