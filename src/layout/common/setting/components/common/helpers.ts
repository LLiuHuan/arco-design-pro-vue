import type { ProjectConfig } from '~/types/config';
import { useAppStore } from '@/store/modules/app';
import { AppEnum } from '@/enums';

enum HandlerEnum {
  // menu
  MENU_THEME = 1,
  MENU_COLLAPSE,
  MENU_COLLAPSE_BTN,
  MENU_ACCORDION,

  // header
  HEADER_HEIGHT,

  // transition
  TRANSITION_ENABLE,
  TRANSITION_ROUTER,
  TRANSITION_LOADING,
  TRANSITION_NPROGRESS,
}

const handler = (
  event: HandlerEnum,
  value: any,
): DeepPartial<ProjectConfig> => {
  switch (event) {
    case HandlerEnum.MENU_THEME:
      return {
        menuSetting: { theme: value ? AppEnum.DARK : AppEnum.LIGHT },
      };
    case HandlerEnum.MENU_COLLAPSE:
      return {
        menuSetting: { collapsed: value },
      };
    case HandlerEnum.MENU_COLLAPSE_BTN:
      return {
        menuSetting: { trigger: value },
      };
    case HandlerEnum.MENU_ACCORDION:
      return {
        menuSetting: { accordion: value },
      };
    case HandlerEnum.HEADER_HEIGHT:
      if (value < 48) {
        value = 48;
      }
      return {
        headerSetting: { height: value },
      };
    case HandlerEnum.TRANSITION_ENABLE:
      return {
        transitionSetting: { enable: value },
      };
    case HandlerEnum.TRANSITION_ROUTER:
      return {
        transitionSetting: { basicTransition: value },
      };
    case HandlerEnum.TRANSITION_LOADING:
      return {
        transitionSetting: { openPageLoading: value },
      };
    case HandlerEnum.TRANSITION_NPROGRESS:
      return {
        transitionSetting: { openNProgress: value },
      };
    default:
      return {};
  }
};

function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  appStore.setProjectConfig(config);
}

export { HandlerEnum, baseHandler, handler };
