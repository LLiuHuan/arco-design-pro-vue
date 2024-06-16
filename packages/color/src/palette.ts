import { AnyColor, Colord, colord } from 'colord';
import { getColorString } from './utils';

// 色板

// 动态梯度算法
export function colorPalette(
  originColor: Colord | AnyColor,
  i: number,
  format?: 'hex' | 'rgb' | 'hsl',
): string {
  const color = colord(originColor);
  const { h, s, v } = color.toHsv();

  const hueStep = 2;
  const maxSaturationStep = 100;
  const minSaturationStep = 9;

  const maxValue = 100;
  const minValue = 30;

  const getNewHue = (isLight: boolean, i: number) => {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * i : h + hueStep * i;
    } else {
      hue = isLight ? h + hueStep * i : h - hueStep * i;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  };

  const getNewSaturation = (isLight: boolean, i: number) => {
    let newSaturation;

    if (isLight) {
      newSaturation =
        s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * i;
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * i;
    }
    return newSaturation;
  };

  const getNewValue = (isLight: boolean, i: number) => {
    return isLight
      ? v + ((maxValue - v) / 5) * i
      : v <= minValue
        ? v
        : v - ((v - minValue) / 4) * i;
  };

  const isLight = i < 6;
  const index = isLight ? 6 - i : i - 6;

  const retColor =
    i === 6
      ? color
      : colord({
          h: getNewHue(isLight, index),
          s: getNewSaturation(isLight, index),
          v: getNewValue(isLight, index),
        });

  return getColorString(retColor, format);
}
