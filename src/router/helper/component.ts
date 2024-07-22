/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-07-18 16:53:02
 * @LastEditors: LLiuHuan
 */
import { views } from '@/views';
import { RouteComponent } from 'vue-router';
import { isFunction } from '@/utils/common';
import { BasicLayout, BlankLayout } from '@/layout';
// import BasicLayout from '@/layout/basic-layout/index.vue';
// import BlankLayout from '@/layout/blank-layout/index.vue';

type Lazy<T> = () => Promise<T>;

interface ModuleComponent {
  default: RouteComponent;
}

type LayoutComponent = Record<LayoutComponentType, Lazy<ModuleComponent>>;

/**
 * 获取布局的vue文件(懒加载的方式)
 * @param layoutType - 布局类型
 */
export function getLayoutComponent(layoutType: LayoutComponentType) {
  const layoutComponent: LayoutComponent = {
    basic: BasicLayout,
    blank: BlankLayout,
  };
  return layoutComponent[layoutType];
}

function isAsyncComponent(
  component: RouteComponent | Lazy<ModuleComponent>,
): component is Lazy<ModuleComponent> {
  return isFunction(component);
}

/** 给页面组件设置名称 */
function setViewComponentName(
  component: RouteComponent | Lazy<ModuleComponent>,
  name: string,
) {
  if (isAsyncComponent(component)) {
    return async () => {
      const result = await component();
      Object.assign(result.default, { name });
      return result;
    };
  }

  Object.assign(component, { name });

  return component;
}

/**
 * 获取页面导入的vue文件
 * @param routeKey - 路由key
 */
export function getViewComponent(routeKey: string) {
  if (!views[routeKey]) {
    throw new Error(`路由“${routeKey}”没有对应的组件文件！`);
  }
  return setViewComponentName(views[routeKey], routeKey);
}
