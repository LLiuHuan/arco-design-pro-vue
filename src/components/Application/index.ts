import { withInstall } from '@/utils/common';
import appProvider from './src/AppProvider.vue';
import appLogo from './src/AppLogo.vue';

export const AppLogo = withInstall(appLogo);
export const AppProvider = withInstall(appProvider);
