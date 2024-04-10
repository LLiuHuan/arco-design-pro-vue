import type { Router } from 'vue-router';
import { useI18n } from '@/hooks/web/useI18n';
import { useTitle } from '@vueuse/core';

export function createTitleGuard(router: Router) {
  router.afterEach((to) => {
    const { i18nTitle, title } = to.meta;
    const { t } = useI18n();

    const documentTitle = i18nTitle ? t(i18nTitle as string) : title;

    useTitle(documentTitle);
  });
}
