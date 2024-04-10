import { useI18n } from '@/hooks/web/useI18n';
import { RouterTransitionEnum } from '@/enums';

export const getRouterAnimationOptions = () => {
  const { t } = useI18n();
  return [
    {
      value: RouterTransitionEnum.ZOOM_FADE,
      label: t('layout.setting.interfaceDisplay.routerAnimationZoomFade'),
    },
    {
      value: RouterTransitionEnum.ZOOM_OUT,
      label: t('layout.setting.interfaceDisplay.routerAnimationZoomOut'),
    },
    {
      value: RouterTransitionEnum.FADE_SLIDE,
      label: t('layout.setting.interfaceDisplay.routerAnimationFadeSlide'),
    },
    {
      value: RouterTransitionEnum.FADE,
      label: t('layout.setting.interfaceDisplay.routerAnimationFade'),
    },
    {
      value: RouterTransitionEnum.FADE_BOTTOM,
      label: t('layout.setting.interfaceDisplay.routerAnimationFadeBottom'),
    },
    {
      value: RouterTransitionEnum.FADE_SCALE,
      label: t('layout.setting.interfaceDisplay.routerAnimationFadeScale'),
    },
  ];
};
