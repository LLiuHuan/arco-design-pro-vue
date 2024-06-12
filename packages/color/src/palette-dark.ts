import { AnyColor, Colord, colord } from 'colord';
import { getColorString } from '~/packages/color/src/utils';
import { colorPalette } from './palette';

// 暗色色板

// 动态梯度算法
export function colorPaletteDark(
  originColor: Colord | AnyColor,
  i: number,
  format: 'hex' | 'rgb' | 'hsl',
): string {
  const lightColor = colord(
    colorPalette(originColor, 10 - i + 1, format),
  ).toHsv();
  const originBaseColor = colord(originColor);

  const getNewSaturation = (_index: number) => {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 0 && originBaseHue < 50) {
        return originBaseSaturation - 15;
      }
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      if (originBaseHue >= 191 && originBaseHue <= 360) {
        return originBaseSaturation - 15;
      }
    }

    return baseSaturation - step * (_index - 6);
  };

  const {
    h: originBaseHue,
    s: originBaseSaturation,
    v: originBaseValue,
  } = originBaseColor.toHsv();
  const baseColor = colord({
    h: originBaseHue,
    s: getNewSaturation(6),
    v: originBaseValue,
  });

  const { s: baseSaturation } = baseColor.toHsv();
  const step = Math.ceil((baseSaturation - 9) / 4);
  const step1to5 = Math.ceil((100 - baseSaturation) / 5);

  return getColorString(
    colord({
      h: lightColor.h,
      s: getNewSaturation(i),
      v: lightColor.v,
    }),
    format,
  );
}
