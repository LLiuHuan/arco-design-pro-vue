/**
 * @description PWA plugin
 */

import { VitePWA } from 'vite-plugin-pwa';

export function configPWAPlugin(viteEnv: ImportMetaEnv) {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_APP_SHORT_NAME } = viteEnv;
  return VitePWA({
    registerType: 'autoUpdate',
    includeAssets: ['favicon.ico'],
    manifest: {
      name: VITE_GLOB_APP_TITLE,
      short_name: VITE_GLOB_APP_SHORT_NAME,
      theme_color: '#fff',
      icons: [
        {
          src: '/logo.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
        },
        {
          src: '/logo.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable',
        },
      ],
    },
  });
}
