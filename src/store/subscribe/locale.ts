import { effectScope, onScopeDispose, watch } from 'vue';
import { router } from '@/router';
import { useI18n } from '@/hooks/web/useI18n';
import { useTitle } from '@vueuse/core';
import { setDayjsLocale } from '@/locale/dayjs';
import { useLocaleStore } from '../modules/locale';

/** 订阅locale store */
export default function subscribeLocaleStore() {
  const locale = useLocaleStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => locale.localInfo.locale,
      () => {
        const { i18nTitle, title } = router.currentRoute.value.meta;
        const { t } = useI18n();
        const documentTitle = i18nTitle ? t(i18nTitle) : title;
        useTitle(documentTitle);

        setDayjsLocale(locale.localInfo.locale);
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
