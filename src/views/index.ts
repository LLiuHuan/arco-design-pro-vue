import type { Component } from 'vue';

// ViewComponent 是一个对象，key 是文件路径，value 是一个函数，函数返回 import.meta.globEager 导入的对象
type ViewComponent = Record<string, () => Promise<Component>>;
const importViews = import.meta.glob('./**/index.vue') as ViewComponent;

// 组件文件夹，过滤使用
const COMPONENTS_KEY = 'components';
// 文件路径前缀
const PREFIX = './';
// 文件路径后缀
const SUFFIX = '/index.vue';
// 路径分隔符
const PATH_SPLIT_MARK = '/';
// 路由分隔符
const ROUTE_KEY_SPLIT_MARK = '_';
// 系统的内置路由，该文件夹名称不作为RouteKey
const SYSTEM_VIEW = 'base_';

// 过滤掉组件文件
const viewKeys = Object.keys(importViews).filter(
  (key) => !key.includes(COMPONENTS_KEY),
);

// 获取组件对象
function getViewComponent() {
  const components: ViewComponent = {};
  viewKeys.forEach((key) => {
    const routeKey = key
      .replace(PREFIX, '')
      .replace(SUFFIX, '')
      .replace(new RegExp(PATH_SPLIT_MARK, 'g'), ROUTE_KEY_SPLIT_MARK)
      .replace(SYSTEM_VIEW, '');
    components[routeKey] = importViews[key];
  });
  return components;
}

// 导出组件对象
export const views = getViewComponent();
