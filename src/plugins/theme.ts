// import '@/styles/theme/theme-christmas.less';

import { storage } from '@/utils/storage/storage';

export function setupTheme() {
  const theme = storage.get('_theme') ?? 'default';
  switch (theme) {
    case 'default':
      import('@arco-design/web-vue/dist/arco.css');
      break;
    case 'theme-christmas':
      import('@/styles/theme/theme-christmas.less');
      break;
    default:
      import('@arco-design/web-vue/dist/arco.css');
  }
}
