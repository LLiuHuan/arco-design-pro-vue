// import type { Router } from 'vue-router';
// import { PageEnum } from '@/enums';
// import { useAuthStoreWithOut } from '@/store/modules/auth';
// import { useAppStoreWithOut } from '@/store/modules/app';
// import { useRouteStoreWithOut } from '@/store/modules/route';

import { Router } from 'vue-router';
import { PageEnum } from '@/enums';
import { useAuthStoreWithOut } from '@/store/modules/auth';
import { removeTabChangeListener } from '@/utils/router';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    // 只需进入登录页面并清除认证信息即可
    if (to.name === PageEnum.LOGIN) {
      const authStore = useAuthStoreWithOut();

      authStore.resetAuthStore();
    } else if (to.name === PageEnum.REDIRECT) {
      removeTabChangeListener();
    }
  });
}
