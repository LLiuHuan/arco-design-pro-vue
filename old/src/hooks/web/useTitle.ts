import { useGlobSetting } from '@/hooks/setting';
import { useI18n } from '@/hooks/web/useI18n';
import { useRouter } from 'vue-router';
import { useTitle as usePageTitle } from '@vueuse/core';
import { unref, watch } from 'vue';
import { useLocale } from '@/hooks/web/useLocale';

export function useTitle() {
  const { VITE_GLOB_APP_TITLE } = useGlobSetting();
  const { t } = useI18n();
  const { currentRoute } = useRouter();
  const { getLocale } = useLocale();

  const pageTitle = usePageTitle();

  watch(
    [() => currentRoute.value.path, () => getLocale],
    () => {
      const route = unref(currentRoute);

      if (route.name === 'REDIRECT_NAME') {
        return;
      }

      const tTitle = t(route?.meta?.i18nKey as string);
      pageTitle.value = tTitle
        ? ` ${tTitle} - ${VITE_GLOB_APP_TITLE} `
        : `${VITE_GLOB_APP_TITLE}`;
    },
    {
      immediate: true,
    },
  );
}
