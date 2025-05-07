import { LocaleEnum } from '@/enums';
import { deepMerge } from '@/utils/common';

// 组件文件夹，过滤使用
const COMPONENTS_KEY = 'components';
// 国际化文件夹
const LANG = 'lang';

const modules: Recordable<Recordable> = import.meta.glob('./**', {
  eager: true,
});

// 循环数组，将数组转换为多级对象, 例如：['dashboard', 'analysis'] => { dashboard: { analysis: value } }
function listToMultilevelObject(list: string[], value: any) {
  // function camelToUnderscore(str: string) {
  //   const newStr = str.replace(/([A-Z])/g, '_$1').toLowerCase();
  //
  //   return (newStr[0] === '_' && newStr.slice(1)) || newStr;
  // }

  list.reverse();
  let obj: Recordable = {};
  list.forEach((key: string, index: number) => {
    // const lowerKey = camelToUnderscore(key);
    if (index === 0) {
      obj = { [key]: value };
    } else {
      obj = { [key]: obj };
    }
  });
  return obj;
}

export function genLocaleMessage(locale = LocaleEnum.zh_CN) {
  let obj: Recordable = {};
  Object.keys(modules).forEach((key) => {
    if (key.indexOf(LANG) === -1 || key.indexOf(`${locale}`) === -1) {
      return;
    }
    const langFileModule = modules[key].default;
    let fileName = key
      .replace(`/${locale}`, '')
      .replace(`/${LANG}`, '')
      .replace(`/${COMPONENTS_KEY}`, '')
      .replace(/^\.\//, '');
    const lastIndex = fileName.lastIndexOf('.');
    fileName = fileName.substring(0, lastIndex);
    const keyList = fileName.split('/');
    const listObject = listToMultilevelObject(keyList, langFileModule);
    obj = deepMerge(obj, listObject);
  });

  return obj;
}
