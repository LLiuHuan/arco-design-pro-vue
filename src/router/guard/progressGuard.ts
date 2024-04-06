import type { Router } from 'vue-router';
import { useTransitionSetting } from '@/hooks/setting';
import { unref } from 'vue';
import nProgress from 'nprogress';

/**
 * Create a progress bar guard - [创建进度条守卫]
 * @param router
 */
export function createProgressGuard(router: Router) {
  const { getOpenNProgress } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (to.meta.loaded) {
      return true;
    }
    if (unref(getOpenNProgress)) nProgress.start();
    return true;
  });

  router.afterEach(async () => {
    if (unref(getOpenNProgress)) nProgress.done();
    return true;
  });
}
