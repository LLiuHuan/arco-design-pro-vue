import type { Router } from 'vue-router';
import { unref } from 'vue';
import { useRootSetting, useTransitionSetting } from '@/hooks/setting';
import { useAuthStore } from '@/store/modules/auth';

// Used to handle page loading status
export function createPageLoadingGuard(router: Router) {
  const authStore = useAuthStore();
  const { setPageLoading, setPageLoadingAction } = useRootSetting();
  const { getOpenPageLoading } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (!authStore.isLogin) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(getOpenPageLoading)) {
      await setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        setPageLoading(false);
      }, 220);
    }
    return true;
  });
}
