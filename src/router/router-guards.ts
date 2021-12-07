import { Router } from 'vue-router';

export function createRouterGuards(router: Router) {
  // to, from, next
  router.beforeEach(async () => {});

  // // , failure
  // router.afterEach((to, _) => {
  //   // TODO: title暂时先不适配i18n
  //   document.title = (to?.meta?.title as string) || document.title;
  // });

  router.onError((error) => {
    console.log(error, '路由错误');
  });
}
