import 'vue-router';

// 为了替换 vue-router 的 RouteMeta
declare module 'vue-router' {
  interface RouteMeta extends AuthRoute.RouteMeta {}
}
