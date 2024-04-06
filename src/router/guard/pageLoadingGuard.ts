import type { Router } from 'vue-router';
import { unref } from 'vue';
import { useTransitionSetting } from '@/hooks/setting';
import { useAppStoreWithOut } from '@/store/modules/app';
import { useAuthStoreWithOut } from '@/store/modules/auth';

// Used to handle page loading status
export function createPageLoadingGuard(router: Router) {
  const userStore = useAuthStoreWithOut();
  const appStore = useAppStoreWithOut();
  const { getOpenPageLoading } = useTransitionSetting();
  router.beforeEach(async (to) => {
    if (!userStore.getToken) {
      return true;
    }
    if (to.meta.loaded) {
      return true;
    }

    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true);
      return true;
    }

    return true;
  });
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      // The timer simulates the loading time to prevent flashing too fast,
      setTimeout(() => {
        appStore.setPageLoading(false);
      }, 220);
    }
    return true;
  });
}
