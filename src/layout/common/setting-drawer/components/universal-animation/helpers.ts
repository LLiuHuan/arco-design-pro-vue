/*
 * @Description:
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-21 14:38:19
 * @LastEditors: LLiuHuan
 */
import { useI18n } from '@/hooks/web/useI18n';
import { RouterTransitionEnum } from '@/enums';

export const getRouterAnimationOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: RouterTransitionEnum.ZOOM_FADE,
      label: t('layout.setting.universal.animation.routerAnimationZoomFade'),
    },
    {
      value: RouterTransitionEnum.ZOOM_OUT,
      label: t('layout.setting.universal.animation.routerAnimationZoomOut'),
    },
    {
      value: RouterTransitionEnum.FADE_SLIDE,
      label: t('layout.setting.universal.animation.routerAnimationFadeSlide'),
    },
    {
      value: RouterTransitionEnum.FADE,
      label: t('layout.setting.universal.animation.routerAnimationFade'),
    },
    {
      value: RouterTransitionEnum.FADE_BOTTOM,
      label: t('layout.setting.universal.animation.routerAnimationFadeBottom'),
    },
    {
      value: RouterTransitionEnum.FADE_SCALE,
      label: t('layout.setting.universal.animation.routerAnimationFadeScale'),
    },
  ];
};
