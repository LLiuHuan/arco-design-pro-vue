import { RouteLocation } from 'vue-router';
import { FunctionalComponent } from 'vue';

export interface DefaultContext {
  Component: FunctionalComponent & { type: Recordable };
  route: RouteLocation;
}

export function getTransitionName({
  route,
  openCache,
  cacheTabs,
  enableTransition,
  def,
}: Pick<DefaultContext, 'route'> & {
  enableTransition: boolean;
  openCache: boolean;
  def: string;
  cacheTabs: string[];
}): string | undefined {
  if (!enableTransition) {
    return undefined;
  }

  const isInCache = cacheTabs.includes(route.name as string);
  const transitionName = 'fade-slide';
  let name: string | undefined = transitionName;

  if (openCache) {
    name = isInCache && route.meta.loaded ? transitionName : undefined;
  }
  console.log(name || (route.meta.transitionName as string) || def);
  return name || (route.meta.transitionName as string) || def;
}
