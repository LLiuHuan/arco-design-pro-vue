import { AnyColor, Colord, colord } from 'colord';
import { getColorString } from './utils';
import { colorPalette } from './palette';

// 暗色色板

/**
 * 暗色系颜色动态梯度算法
 * @returns string
 * @param originColor 基础色
 * @param i 索引 [1-10]
 * @param format 颜色格式
 */
export function colorPaletteDark(
  originColor: Colord | AnyColor,
  i: number,
  format: 'hex' | 'rgb' | 'hsl',
): string {
  const lightColor = colord(
    colorPalette(originColor, 10 - i + 1, format),
  ).toHsv();
  const originBaseColor = colord(originColor);
  const {
    h: originBaseHue,
    s: originBaseSaturation,
    v: originBaseValue,
  } = originBaseColor.toHsv();

  function baseColorSaturation(): number {
    if (originBaseHue >= 50 && originBaseHue < 191) {
      return originBaseSaturation - 20;
    }
    return originBaseSaturation - 15;
  }

  const baseColor = {
    h: originBaseHue,
    s: baseColorSaturation(),
    v: originBaseValue,
  };

  const { s: baseSaturation } = baseColor;
  // const baseSaturation = baseColor.s;

  const step = Math.ceil((baseSaturation - 9) / 4);
  const step1to5 = Math.ceil((100 - baseSaturation) / 5);

  function getNewSaturation(_index: number): number {
    if (_index < 6) {
      return baseSaturation + (6 - _index) * step1to5;
    }
    if (_index === 6) {
      if (originBaseHue >= 50 && originBaseHue < 191) {
        return originBaseSaturation - 20;
      }
      return originBaseSaturation - 15;
    }
    return baseSaturation - step * (_index - 6);
  }

  return getColorString(
    colord({
      h: lightColor.h,
      s: getNewSaturation(i),
      v: lightColor.v,
    }),
  );
}
