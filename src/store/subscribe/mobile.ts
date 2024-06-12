import { useAppStore } from '@/store/modules/app';
import { effectScope, nextTick, onScopeDispose, watch } from 'vue';
import { MenuModeEnum } from '@/enums';

/**
 * @description 订阅是否是移动端 store
 */
export default function subscribeMobileStore() {
  const appStore = useAppStore();

  const scope = effectScope();
  scope.run(() => {
    watch(
      () => appStore.isMobile,
      (newValue) => {
        if (newValue) {
          appStore.setBeforeMiniInfo({
            layoutMode: appStore.projectConfig?.layoutSetting.mode,
            siderCollapsed: appStore.projectConfig?.menuSetting.collapsed,
          });

          appStore.setProjectConfig({
            layoutSetting: {
              mode: MenuModeEnum.VERTICAL,
            },
            menuSetting: {
              collapsed: true,
            },
          });

          document.body.classList.add('mobile');
        } else {
          const { beforeMiniInfo } = appStore;
          if (beforeMiniInfo) {
            nextTick(() => {
              appStore.setProjectConfig({
                layoutSetting: {
                  mode: beforeMiniInfo.layoutMode,
                },
                menuSetting: {
                  collapsed: beforeMiniInfo.siderCollapsed,
                },
              });

              appStore.setBeforeMiniInfo({});
            });
          }
          document.body.classList.remove('mobile');
        }
      },
      { immediate: true },
    );
  });

  onScopeDispose(() => {
    scope.stop();
  });
}
