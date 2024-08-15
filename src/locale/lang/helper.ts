import type { LocaleType } from '~/types/config';
import { set } from 'lodash-es';
import { LocaleEnum } from '@/enums';

export const loadLocalePool: LocaleType[] = [];

export function setHtmlPageLang(locale: LocaleType) {
  document.querySelector('html')?.setAttribute('lang', locale);
}

export function setLoadLocalePool(cb: (loadLocalePool: LocaleType[]) => void) {
  cb(loadLocalePool);
}

export function genMessage(locale: LocaleType = LocaleEnum.zh_CN) {
  const modules: Recordable<Recordable> = import.meta.glob(
    './**/*.{json,ts,js}',
    { eager: true },
  );

  const obj: Recordable = {};
  Object.keys(modules).forEach((key) => {
    if (key.indexOf(`./${locale}/`) === -1) return;
    const langFileModule = modules[key].default;
    let fileName = key.replace(`./${locale}/`, '').replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const moduleName = keyList.shift();
    const objKey = keyList.join('.');

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}
