import { mitt } from '@/utils/common';
import type {
  RouteLocationNormalized,
  RouteRecordNormalized,
} from 'vue-router';

const key = Symbol();

const emitter = mitt<{
  [key]: RouteLocationNormalized;
}>();

let lastChangeTab: RouteLocationNormalized;

export function getRawRoute(
  route: RouteLocationNormalized,
): RouteLocationNormalized {
  if (!route) return route;
  const { matched, ...opt } = route;
  return {
    ...opt,
    matched: (matched
      ? matched.map((item) => ({
          meta: item.meta,
          name: item.name,
          path: item.path,
        }))
      : undefined) as RouteRecordNormalized[],
  };
}

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  const r = getRawRoute(lastChangeRoute);
  emitter.emit(key, r);
  lastChangeTab = r;
}

export function listenerRouteChange(
  callback: (route: RouteLocationNormalized) => void,
  immediate = true,
) {
  emitter.on(key, callback);
  if (immediate && lastChangeTab) callback(lastChangeTab);
}

export function removeTabChangeListener() {
  emitter.clear();
}
