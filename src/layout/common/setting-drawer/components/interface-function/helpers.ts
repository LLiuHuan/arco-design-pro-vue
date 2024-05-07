import { TriggerEnum } from '@/enums';
import { useI18n } from '@/hooks/web/useI18n';

export const getMenuTriggerOptions = (hideTop: boolean) => {
  const { t } = useI18n();

  return [
    {
      value: TriggerEnum.NONE,
      label: t('layout.setting.interfaceFunction.menuTriggerNone'),
    },
    {
      value: TriggerEnum.FOOTER,
      label: t('layout.setting.interfaceFunction.menuTriggerBottom'),
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: t('layout.setting.interfaceFunction.menuTriggerTop'),
          },
        ]),
  ];
};

export const getScrollModeOptions = () => {
  const { t } = useI18n();

  return [
    {
      value: 'wrapper',
      label: t('layout.setting.interfaceFunction.scrollMode.wrapper'),
    },
    {
      value: 'content',
      label: t('layout.setting.interfaceFunction.scrollMode.content'),
    },
  ];
};
