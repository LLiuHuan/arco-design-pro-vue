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
}

function baseHandler(event: HandlerEnum, value: any) {
  const appStore = useAppStore();
  const config = handler(event, value);
  console.log(event, value, config);
  appStore.setProjectConfig(config);
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
    default:
      return {};
  }
};

export { HandlerEnum, baseHandler, handler };
