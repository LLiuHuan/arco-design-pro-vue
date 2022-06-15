import { handleModuleRoutes } from '@/utils';

const modules = import.meta.globEager('./**/*.ts') as AuthRoute.RouteModule;
console.log(modules);
export const routes = handleModuleRoutes(modules);
