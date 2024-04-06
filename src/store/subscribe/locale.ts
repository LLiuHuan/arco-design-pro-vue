import { effectScope, onScopeDispose, watch } from 'vue';
import { useLocaleStore } from '../modules/locale';

/** 订阅locale store */
export default function subscribeLocaleStore() {
  const locale = useLocaleStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => locale.localInfo.locale,
      () => {
        locale.updateTitleByLocale();

        // TODO: dayjs locale
        // 等弄完以后将时间操作类替换成dayjs
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
