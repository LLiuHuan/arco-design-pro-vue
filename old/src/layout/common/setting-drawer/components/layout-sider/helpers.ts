/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-21 16:45:08
 * @LastEditTime: 2024-08-22 12:52:12
 * @LastEditors: LLiuHuan
 */
import { TriggerEnum } from '@/enums';
import { useI18n } from '@/hooks/web/useI18n';

export const getMenuTriggerOptions = (hideTop: boolean) => {
  const { t } = useI18n();

  return [
    {
      value: TriggerEnum.NONE,
      label: t('layout.setting.layout.sider.menuTriggerNone'),
    },
    {
      value: TriggerEnum.FOOTER,
      label: t('layout.setting.layout.sider.menuTriggerBottom'),
    },
    ...(hideTop
      ? []
      : [
          {
            value: TriggerEnum.HEADER,
            label: t('layout.setting.layout.sider.menuTriggerTop'),
          },
        ]),
  ];
};
