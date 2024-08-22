/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-08-21 16:43:31
 * @LastEditTime: 2024-08-22 12:52:32
 * @LastEditors: LLiuHuan
 */
import { useI18n } from '@/hooks/web/useI18n';

export const getScrollModeOptions = () => {
  const { t } = useI18n();

  return [
    {
      value: 'wrapper',
      label: t('layout.setting.layout.other.scrollMode.wrapper'),
    },
    {
      value: 'content',
      label: t('layout.setting.layout.other.scrollMode.content'),
    },
  ];
};
