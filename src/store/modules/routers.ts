import { defineStore } from 'pinia';
import { asyncRoutes, constantRouter } from '@/router';
import { RouteRecordRaw } from 'vue-router';
import { toRaw, unref } from 'vue';
import { generatorDynamicRouter } from '@/router/generator-routers';
import { useProjectSetting } from '@/hooks/setting/useProjectSetting';

export interface IRoutersState {
  menus: RouteRecordRaw[];
  routers: any[];
  addRouters: any[];
}

interface TreeHelperConfig {
  id: string;
  children: string;
  pid: string;
}

const DEFAULT_CONFIG: TreeHelperConfig = {
  id: 'id',
  children: 'children',
  pid: 'pid',
};

const getConfig = (config: Partial<TreeHelperConfig>) => Object.assign({}, DEFAULT_CONFIG, config);

function filter<T = any>(
  tree: T[],
  func: (n: T) => boolean,
  config: Partial<TreeHelperConfig> = {}
): T[] {
  config = getConfig(config);
  const children = config.children as string;

  function listFilter(list: T[]) {
    return list
      .map((node: any) => ({ ...node }))
      .filter((node) => {
        node[children] = node[children] && listFilter(node[children]);
        return func(node) || (node[children] && node[children].length);
      });
  }

  return listFilter(tree);
}

export const useRouterStore = defineStore({
  id: 'app-routers',
  state: (): IRoutersState => ({
    menus: [],
    routers: constantRouter,
    addRouters: [],
  }),
  getters: {
    getRouters(): any[] {
      return this.routers;
    },
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
  },
  actions: {
    setRouters(routers) {
      this.addRouters = routers;
      this.routers = constantRouter.concat(routers);
    },
    setMenus(menus) {
      this.menus = menus;
    },
    async generateRoutes(data) {
      let accessedRouters;
      const permissionsList = data.permissions || [];
      const routeFilter = (route) => {
        const { meta } = route;
        const { permissions } = meta || {};
        if (!permissions) return true;
        return permissionsList.some((item) => permissions.includes(item.value));
      };
      const { getPermissionMode } = useProjectSetting();
      const permissionMode = unref(getPermissionMode);
      if (permissionMode === 'BACK') {
        // 动态获取菜单
        try {
          accessedRouters = await generatorDynamicRouter();
        } catch (error) {
          console.log(error);
        }
      } else {
        try {
          //过滤账户是否拥有某一个权限，并将菜单从加载列表移除
          accessedRouters = filter(asyncRoutes, routeFilter);
        } catch (error) {
          console.log(error);
        }
      }
      accessedRouters = accessedRouters.filter(routeFilter);

      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      return toRaw(accessedRouters);
    },
  },
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-routers',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
