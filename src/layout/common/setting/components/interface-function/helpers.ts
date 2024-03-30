import { TriggerEnum } from '@/enums';

export const getMenuTriggerOptions = (hideTop: boolean) => {
  return [
    {
      value: TriggerEnum.NONE,
      label: 'layout.setting.interfaceFunction.menuTriggerNone',
    },
    {
      value: TriggerEnum.FOOTER,
      label: 'layout.setting.interfaceFunction.menuTriggerBottom',
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: 'layout.setting.interfaceFunction.menuTriggerTop',
          },
        ]),
  ];
};
