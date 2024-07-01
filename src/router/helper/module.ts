/**
 * @description 处理全部导入的路由模块
 * @description Handle all imported routing modules
 *
 * @param modules - 路由模块
 */
export function handleModuleRoutes(modules: AuthRoute.RouteModule) {
  const routes: AuthRoute.ConstRoute[] = [];
  Object.keys(modules).forEach((key) => {
    const item = modules[key].default;
    if (item) {
      routes.push(item);
    } else {
      window.console.error(`路由模块解析出错: key = ${key}`);
    }
  });
  return routes;
  // return sortRoutes(routes);
}
