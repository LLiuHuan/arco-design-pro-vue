import { effectScope, onScopeDispose, watch } from 'vue';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import { useLocaleStore } from '../modules/locale';

/** 订阅locale store */
export default function subscribeLocaleStore() {
  const locale = useLocaleStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => locale.localInfo.locale,
      (newValue) => {
        switch (newValue) {
          case 'zh-CN':
            locale.setLocaleInfo({ arcoLang: zhCN });
            break;
          case 'en-US':
            locale.setLocaleInfo({ arcoLang: enUS });
            break;
          default:
            locale.setLocaleInfo({ arcoLang: zhCN });
            break;
        }
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
