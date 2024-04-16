import type { ProjectConfig } from '~/types/config';
import { useAppStore } from '@/store/modules/app';
import { AppEnum } from '@/enums';

enum HandlerEnum {
  // menu
  MENU_THEME = 1,
  MENU_COLLAPSE,
  MENU_COLLAPSE_BTN,
  MENU_ACCORDION,

  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,

  // header
  HEADER_HEIGHT,
  HEADER_BREADCRUMB,
  HEADER_BREADCRUMB_ICON,

  // transition
  TRANSITION_ENABLE,
  TRANSITION_ROUTER,
  TRANSITION_LOADING,
  TRANSITION_NPROGRESS,

  LAYOUT_MODE,
}

const handler = (
  event: HandlerEnum,
  value: any,
): DeepPartial<ProjectConfig> => {
  switch (event) {
    // region menu
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
    case HandlerEnum.MENU_FIXED_MIX_SIDEBAR:
      return {
        menuSetting: { mixSideFixed: value },
      };
    case HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return {
        menuSetting: { mixSideTrigger: value },
      };

    // endregion

    // region header
    case HandlerEnum.HEADER_HEIGHT:
      if (value < 48) {
        value = 48;
      }
      return {
        headerSetting: { height: value },
      };
    case HandlerEnum.HEADER_BREADCRUMB:
      return {
        headerSetting: { showBreadCrumb: value },
      };
    case HandlerEnum.HEADER_BREADCRUMB_ICON:
      return {
        headerSetting: { showBreadCrumbIcon: value },
      };

    // endregion

    // region transition
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
    // endregion

    case HandlerEnum.LAYOUT_MODE:
      const { mode, type } = value;
      // const isMixSidebar = type === MenuTypeEnum.MIX_TOP_MENU;
      // const mixSideSplitOpt =
      //   menuSetting.type === MenuTypeEnum.MIX_TOP_MENU ? { split: menuSetting.split } : { split };
      // const otherSplitOpt = { split: false };
      // const splitOpt = isMixSidebar ? mixSideSplitOpt : otherSplitOpt;

      return {
        menuSetting: {
          mode,
          type,
          collapsed: false,
        },
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
