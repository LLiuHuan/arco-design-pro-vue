import type { Router } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
import { useTitle } from '@vueuse/core';

export function createTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { i18nKey, title } = to.meta;
    const { t } = useI18n();

    const documentTitle = i18nKey ? t(i18nKey as string) : title;

    useTitle(documentTitle);
  });
}
