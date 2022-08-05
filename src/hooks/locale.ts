import { computed } from 'vue';
// import { Message } from '@arco-design/web-vue';
import { useI18n } from 'vue-i18n';
import { useThemeStore } from '@/store';

export default function useLocale() {
  const i18 = useI18n();
  const currentLocale = computed(() => {
    return i18.locale.value;
  });
  const changeLocale = (value: EnumType.Language) => {
    i18.locale.value = value;
    const theme = useThemeStore();
    theme.setLanguage(value);
    // Message.success(i18.t('navbar.action.locale'));
  };
  return {
    currentLocale,
    changeLocale,
  };
}
