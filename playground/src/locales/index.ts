/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2025-05-28 12:17:56
 * @LastEditTime: 2025-07-24 09:55:11
 * @LastEditors: LLiuHuan
 */
import type { LocaleSetupOptions, SupportedLanguagesType } from '@arco/locales';

import type { App } from 'vue';

import {
  $t,
  setupI18n as coreSetup,
  loadLocalesMapFromDir,
} from '@arco/locales';
import { preferences } from '@arco/preferences';

const modules = import.meta.glob('./langs/**/*.json');

const localesMap = loadLocalesMapFromDir(
  /\.\/langs\/([^/]+)\/(.*)\.json$/,
  modules,
);

/**
 * 加载应用特有的语言包
 * 这里也可以改造为从服务端获取翻译数据
 * @param lang
 */
async function loadMessages(lang: SupportedLanguagesType) {
  if (!localesMap[lang]) {
    console.warn(`Locale ${lang} is not supported, falling back to default`);
    return;
  }

  try {
    const appLocaleMessages = await localesMap[lang]?.();
    return appLocaleMessages?.default;
  } catch (error) {
    console.error(`Failed to load locale messages for ${lang}:`, error);
  }
}

async function setupI18n(app: App, options: LocaleSetupOptions = {}) {
  await coreSetup(app, {
    defaultLocale: preferences.app.locale,
    loadMessages,
    missingWarn: !import.meta.env.PROD,
    ...options,
  });
}

export { $t, setupI18n };
