import type { RouteLocationNormalized, Router } from 'vue-router';

/**
 * Create a scroll guard to scroll to the top when switching routes - [创建滚动守卫, 切换路由时滚动到顶部]
 * @param router
 */
export function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href);
  };

  const { body } = document;

  router.afterEach(async (to) => {
    // scroll top
    isHash((to as RouteLocationNormalized & { href: string })?.href) &&
      body.scrollTo(0, 0);
    return true;
  });
}
