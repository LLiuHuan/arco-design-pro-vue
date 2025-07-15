/*
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2025-05-27 09:37:08
 * @LastEditTime: 2025-07-15 02:18:43
 * @LastEditors: LLiuHuan
 */
import { computed } from 'vue';

import { preferences } from '@arco/preferences';
import '@arco/styles';

import { createDiscreteApi, darkTheme, lightTheme } from 'naive-ui';

const themeOverridesProviderProps = computed(() => ({
  themeOverrides: preferences.theme.mode === 'light' ? lightTheme : darkTheme,
}));

const themeProviderProps = computed(() => ({
  theme: preferences.theme.mode === 'light' ? lightTheme : darkTheme,
}));

export const { dialog, loadingBar, message, modal, notification } =
  createDiscreteApi(
    ['message', 'dialog', 'notification', 'loadingBar', 'modal'],
    {
      configProviderProps: themeProviderProps,
      loadingBarProviderProps: themeOverridesProviderProps,
      messageProviderProps: themeOverridesProviderProps,
      notificationProviderProps: themeOverridesProviderProps,
    },
  );
