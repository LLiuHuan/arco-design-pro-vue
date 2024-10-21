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

  const getNewHue = (isLight: boolean, index: number) => {
    let hue;
    if (h >= 60 && h <= 240) {
      hue = isLight ? h - hueStep * index : h + hueStep * index;
    } else {
      hue = isLight ? h + hueStep * index : h - hueStep * index;
    }
    if (hue < 0) {
      hue += 360;
    } else if (hue >= 360) {
      hue -= 360;
    }
    return Math.round(hue);
  };

  const getNewSaturation = (isLight: boolean, index: number) => {
    let newSaturation;

    if (isLight) {
      newSaturation =
        s <= minSaturationStep ? s : s - ((s - minSaturationStep) / 5) * index;
    } else {
      newSaturation = s + ((maxSaturationStep - s) / 4) * index;
    }
    return newSaturation;
  };

  const getNewValue = (isLight: boolean, index: number) => {
    if (isLight) {
      return v + ((maxValue - v) / 5) * index;
    }
    return v <= minValue ? v : v - ((v - minValue) / 4) * index;
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
