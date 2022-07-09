import DefineOptions from 'unplugin-vue-define-options/vite';
import Icons from 'unplugin-icons/vite';
import IconsResolver from 'unplugin-icons/resolver';
import Components from 'unplugin-vue-components/vite';
import { ArcoResolver } from 'unplugin-vue-components/resolvers';
import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

export default (srcPath: string) => {
  return [
    DefineOptions(),
    Icons({
      compiler: 'vue3',
      customCollections: {
        custom: FileSystemIconLoader(`${srcPath}/assets/svg`),
      },
      scale: 1,
      defaultClass: 'inline-block',
    }),
    Components({
      dts: 'src/typings/components.d.ts',
      types: [{ from: 'vue-router', names: ['RouterLink', 'RouterView'] }],
      resolvers: [
        ArcoResolver(),
        IconsResolver({ customCollections: ['custom'], componentPrefix: 'icon' }),
      ],
    }),
    createSvgIconsPlugin({
      iconDirs: [`${srcPath}/assets/svg`],
      symbolId: 'icon-custom-[dir]-[name]',
      inject: 'body-last',
      customDomId: '__CUSTOM_SVG_ICON__',
    }),
  ];
};
