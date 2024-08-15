// import type { Router } from 'vue-router';
// import { PageEnum } from '@/enums';
// import { useAuthStore } from '@/store/modules/auth';
// import { useAppStore } from '@/store/modules/app';
// import { useRouteStore } from '@/store/modules/route';

import { Router } from 'vue-router';
import { PageEnum } from '@/enums';
import { removeTabChangeListener } from '@/utils/router';
import { useAuthStore } from '@/store/modules/auth';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    // Just enter the login page and clear the authentication information
    // 只需进入登录页面并清除认证信息即可
    if (to.name === PageEnum.LOGIN) {
      const authStore = useAuthStore();
      authStore.resetStore(true);
      removeTabChangeListener();
    }
    // else if (to.name === PageEnum.REDIRECT) {
    // }
  });
}
