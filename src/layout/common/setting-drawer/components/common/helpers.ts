import type { ProjectConfig } from '~/types/config';
import { useAppStore } from '@/store/modules/app';
import { AppEnum } from '@/enums';
import { toggleClass } from '@/utils/common';

enum HandlerEnum {
  // menu
  MENU_THEME = 1,
  MENU_COLLAPSE,
  MENU_COLLAPSE_BTN,
  MENU_ACCORDION,
  MENU_REVERSE,

  MENU_TRIGGER_MIX_SIDEBAR,
  MENU_FIXED_MIX_SIDEBAR,
  MENU_EXPANDED_MENU_WIDTH,
  MENU_COLLAPSED_MENU_WIDTH,
  MIX_MENU_EXPANDED_MENU_WIDTH,
  MIX_MENU_COLLAPSED_MENU_WIDTH,
  MIX_MENU_CHILD_MENU_WIDTH,

  // header
  HEADER_HEIGHT,
  HEADER_BREADCRUMB,
  HEADER_BREADCRUMB_ICON,
  HEADER_FIXED,

  // transition
  TRANSITION_ENABLE,
  TRANSITION_ROUTER,
  TRANSITION_LOADING,
  TRANSITION_NPROGRESS,

  // footer
  SHOW_FOOTER,
  FOOTER_HEIGHT,
  FOOTER_FIXED,

  // tabs
  SHOW_TABS,
  TAB_OPEN_CACHE,
  SHOW_TABS_QUICK_BTN,
  SHOW_TABS_REDO_BTN,
  SHOW_TABS_FOLD_BTN,

  // copyright
  COPYRIGHT_SHOW,
  COPYRIGHT_COMPANY,
  COPYRIGHT_COMPANY_LINK,
  COPYRIGHT_RECORD,
  COPYRIGHT_RECORD_LINK,
  COPYRIGHT_POLICE,
  COPYRIGHT_POLICE_LINK,

  LAYOUT_MODE,
  LAYOUT_SCROLL_MODE,
  GRAY_MODE,
  WEAK_MODE,
  SHOW_LOGO,

  WATERMARK,
  WATERMARK_TEXT,
  BORDER_RADIUS,
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
    case HandlerEnum.MENU_REVERSE:
      return {
        layoutSetting: { reverse: value },
      };
    case HandlerEnum.MENU_FIXED_MIX_SIDEBAR:
      return {
        menuSetting: { mixSideFixed: value },
      };
    case HandlerEnum.MENU_TRIGGER_MIX_SIDEBAR:
      return {
        menuSetting: { mixSideTrigger: value },
      };
    case HandlerEnum.MENU_EXPANDED_MENU_WIDTH:
      return {
        menuSetting: { menuWidth: value },
      };
    case HandlerEnum.MENU_COLLAPSED_MENU_WIDTH:
      return {
        menuSetting: { collapsedMenuWidth: value },
      };
    case HandlerEnum.MIX_MENU_EXPANDED_MENU_WIDTH:
      return {
        menuSetting: { mixMenuWidth: value },
      };
    case HandlerEnum.MIX_MENU_COLLAPSED_MENU_WIDTH:
      return {
        menuSetting: { mixCollapsedMenuWidth: value },
      };
    case HandlerEnum.MIX_MENU_CHILD_MENU_WIDTH:
      return {
        menuSetting: { mixChildMenuWidth: value },
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
    case HandlerEnum.HEADER_FIXED:
      return {
        fixedHeaderAndTab: value,
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

    // region footer
    case HandlerEnum.SHOW_FOOTER:
      return {
        footerSetting: { show: value },
      };

    case HandlerEnum.FOOTER_HEIGHT:
      return {
        footerSetting: { height: value },
      };
    case HandlerEnum.FOOTER_FIXED:
      return {
        footerSetting: { fixed: value },
      };
    // endregion

    // region tabs
    case HandlerEnum.SHOW_TABS:
      return {
        multiTabsSetting: { show: value },
      };
    case HandlerEnum.TAB_OPEN_CACHE:
      return {
        multiTabsSetting: { cache: value },
      };
    case HandlerEnum.SHOW_TABS_QUICK_BTN:
      return {
        multiTabsSetting: { showQuick: value },
      };
    case HandlerEnum.SHOW_TABS_REDO_BTN:
      return {
        multiTabsSetting: { showRedo: value },
      };
    case HandlerEnum.SHOW_TABS_FOLD_BTN:
      return {
        multiTabsSetting: { showFold: value },
      };
    // endregion

    case HandlerEnum.LAYOUT_MODE:
      return {
        layoutSetting: {
          mode: value,
        },
      };
    case HandlerEnum.LAYOUT_SCROLL_MODE:
      return {
        layoutSetting: {
          scrollMode: value,
        },
      };
    case HandlerEnum.GRAY_MODE:
      toggleClass(value, 'gray-mode', document.documentElement);
      return {
        grayMode: value,
      };
    case HandlerEnum.WEAK_MODE:
      toggleClass(value, 'color-weak', document.documentElement);
      return {
        colorWeak: value,
      };
    case HandlerEnum.SHOW_LOGO:
      return {
        showLogo: value,
      };

    case HandlerEnum.WATERMARK:
      return {
        watermark: value,
      };
    case HandlerEnum.WATERMARK_TEXT:
      return {
        watermarkText: value,
      };
    case HandlerEnum.BORDER_RADIUS:
      return {
        borderRadius: value,
      };
    case HandlerEnum.COPYRIGHT_SHOW:
      return {
        copyrightSetting: {
          show: value,
        },
      };
    case HandlerEnum.COPYRIGHT_COMPANY:
      return {
        copyrightSetting: {
          company: value,
        },
      };
    case HandlerEnum.COPYRIGHT_COMPANY_LINK:
      return {
        copyrightSetting: {
          companyHref: value,
        },
      };
    case HandlerEnum.COPYRIGHT_RECORD:
      return {
        copyrightSetting: {
          record: value,
        },
      };
    case HandlerEnum.COPYRIGHT_RECORD_LINK:
      return {
        copyrightSetting: {
          recordHref: value,
        },
      };
    case HandlerEnum.COPYRIGHT_POLICE:
      return {
        copyrightSetting: {
          police: value,
        },
      };
    case HandlerEnum.COPYRIGHT_POLICE_LINK:
      return {
        copyrightSetting: {
          policeHref: value,
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
