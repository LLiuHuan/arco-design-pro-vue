import { Router } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
import { transformRouteNameToRoutePath } from '@/router/helper/transform';

/**
 * Is fixed tab
 *
 * @param tab
 */
function isFixedTab(tab: App.Tab) {
  return tab.fixedIndex !== undefined && tab.fixedIndex !== null;
}

/**
 * @description 根据路由获取tab id
 * @description Get tab id by route
 *
 * @param route
 */
export function getTabIdByRoute(route: App.TabRoute) {
  const { path, query = {}, meta } = route;

  let id = path;

  if (meta.multiTab) {
    const queryKeys = Object.keys(query).sort();
    const qs = queryKeys.map((key) => `${key}=${query[key]}`).join('&');

    id = `${path}?${qs}`;
  }

  return id;
}

/**
 * @description 获取固定tabs
 * @description Get fixed tabs
 *
 * @param tabs
 */
export function getFixedTabs(tabs: App.Tab[]) {
  return tabs.filter(isFixedTab);
}

/**
 * @description 获取固定tab ids
 * @description Get fixed tab ids
 *
 * @param tabs
 */
export function getFixedTabIds(tabs: App.Tab[]) {
  const fixedTabs = getFixedTabs(tabs);

  return fixedTabs.map((tab) => tab.id);
}

/**
 * @description vue router会自动合并所有匹配项的meta，这里的图标可能会受到其他的影响
 * @description matching items，所以需要单独处理
 *
 * @description The vue router will automatically merge the meta of all matched items, and the icons here may be affected by other
 * @description matching items, so they need to be processed separately
 *
 * @param route
 */
export function getRouteIcons(route: App.TabRoute) {
  let icon: string = route?.meta?.icon || import.meta.env.VITE_MENU_ICON;
  let localIcon: string | undefined = route?.meta?.localIcon;

  // Route.matched仅在有多个匹配时出现，因此检查route.matched是否存在
  // Route.matched only appears when there are multiple matches,so check if route.matched exists
  if (route.matched) {
    // 从matched中查找当前路由的meta
    // Find the meta of the current route from matched
    const currentRoute = route.matched.find((r) => r.name === route.name);
    // 如果icon存在于currentRoute.meta中，则会覆盖默认值
    // If icon exists in currentRoute.meta, it will overwrite the default value
    icon = currentRoute?.meta?.icon || icon;
    localIcon = currentRoute?.meta?.localIcon;
  }

  return { icon, localIcon };
}

/**
 * @description tab在tabs中
 * @description Is tab in tabs
 *
 * @param tabId Tab id
 * @param tabs Tabs
 */
export function isTabInTabs(tabId: string, tabs: App.Tab[]) {
  return tabs.some((tab) => tab.id === tabId);
}

/**
 * @description 更新tabs label
 * @description Update tabs label
 *
 * @param tabs
 */
function updateTabsLabel(tabs: App.Tab[]) {
  return tabs.map((tab) => ({
    ...tab,
    label: tab.newLabel || tab.oldLabel || tab.label,
  }));
}

/**
 * @description 更新tab label
 * @description Update tab by i18n key
 *
 * @param tab
 */
export function updateTabByI18nKey(tab: App.Tab) {
  const { i18nKey, label } = tab;
  const { t } = useI18n();

  return {
    ...tab,
    label: i18nKey ? t(i18nKey) : label,
  };
}

/**
 * @description 按 Id 过滤选项卡
 * @description Filter tabs by id
 *
 * @param tabId
 * @param tabs
 */
export function filterTabsById(tabId: string, tabs: App.Tab[]) {
  return tabs.filter((tab) => tab.id !== tabId);
}

/**
 * @description 按 Ids 过滤选项卡
 * @description Filter tabs by ids
 *
 * @param tabIds
 * @param tabs
 */
export function filterTabsByIds(tabIds: string[], tabs: App.Tab[]) {
  return tabs.filter((tab) => !tabIds.includes(tab.id));
}

/**
 * @description 根据路由名称获取tab
 * @description find tab by route name
 *
 * @param name
 * @param tabs
 */
export function findTabByRouteName(
  name: AuthRoute.AllRouteKey,
  tabs: App.Tab[],
) {
  const routePath = transformRouteNameToRoutePath(name);

  const tabId = routePath;
  const multiTabId = `${routePath}?`;

  return tabs.find((tab) => tab.id === tabId || tab.id.startsWith(multiTabId));
}

/**
 * @description 更新tabs label
 * @description Update tabs by i18n key
 *
 * @param tabs
 */
export function updateTabsByI18nKey(tabs: App.Tab[]) {
  return tabs.map((tab) => updateTabByI18nKey(tab));
}

/**
 * @description 根据全部路由提取选项卡
 * @description extract tabs by all routes
 *
 * @param router
 * @param tabs
 */
export function extractTabsByAllRoutes(router: Router, tabs: App.Tab[]) {
  const routes = router.getRoutes();

  const routeNames = routes.map((route) => route.name);

  return tabs.filter((tab) => routeNames.includes(tab.routeKey));
}

/**
 * @description 获取全部tabs
 * @description Get all tabs
 *
 * @param tabs Tabs
 * @param homeTab Home tab
 */
export function getAllTabs(tabs: App.Tab[], homeTab?: App.Tab) {
  if (!homeTab) {
    return [];
  }

  const filterHomeTabs = tabs.filter((tab) => tab.id !== homeTab.id);

  const fixedTabs = filterHomeTabs
    .filter(isFixedTab)
    .sort((a, b) => a.fixedIndex! - b.fixedIndex!);

  const remainTabs = filterHomeTabs.filter((tab) => !isFixedTab(tab));

  const allTabs = [homeTab, ...fixedTabs, ...remainTabs];

  return updateTabsLabel(allTabs);
}

export function getTabByRoute(route: App.TabRoute) {
  const { name, path, fullPath = path, meta } = route;

  const { title, i18nKey, fixedIndexInTab } = meta;

  // Get icon and localIcon from getRouteIcons function
  const { icon, localIcon } = getRouteIcons(route);

  const { t } = useI18n();

  const label = i18nKey ? t(i18nKey) : title;

  const tab: App.Tab = {
    id: getTabIdByRoute(route),
    label,
    routeKey: name,
    routePath: path,
    fullPath,
    fixedIndex: fixedIndexInTab,
    icon,
    localIcon,
    i18nKey,
  };

  return tab;
}

/**
 * Get default home tab
 *
 * @param router
 * @param homeRouteName routeHome in useRouteStore
 */
export function getDefaultHomeTab(
  router: Router,
  homeRouteName: AuthRoute.AllRouteKey,
) {
  const { t } = useI18n();
  const homeRoutePath = transformRouteNameToRoutePath(homeRouteName);
  const i18nLabel = t(`route.${homeRouteName}`);

  let homeTab: App.Tab = {
    id: transformRouteNameToRoutePath(homeRouteName),
    label: i18nLabel || homeRouteName,
    routeKey: homeRouteName,
    routePath: homeRoutePath,
    fullPath: homeRoutePath,
  };

  const routes = router.getRoutes();
  const homeRoute = routes.find((route) => route.name === homeRouteName);
  if (homeRoute) {
    homeTab = getTabByRoute(homeRoute);
  }

  return homeTab;
}
