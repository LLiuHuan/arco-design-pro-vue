import { mitt } from '@/utils/common';
import type { RouteLocationNormalized } from 'vue-router';

const key = Symbol();

const emitter = mitt<{
  [key]: RouteLocationNormalized;
}>();

let lastChangeTab: RouteLocationNormalized;

export function setRouteChange(lastChangeRoute: RouteLocationNormalized) {
  emitter.emit(key, lastChangeRoute);
  lastChangeTab = lastChangeRoute;
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
