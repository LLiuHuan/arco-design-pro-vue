import type { AnyColor, Colord } from 'colord';
import { colord, extend } from 'colord';
import mixPlugin from 'colord/plugins/mix';

const formats = ['hex', 'rgb', 'hsl'];

extend([mixPlugin]);

/**
 * 获取格式
 * Get format
 *
 * @param format
 */
function getFormat(format?: string): string {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex';
  }
  return format;
}

/**
 * 获取指定格式的颜色字符串
 * Get color string with specified format
 *
 * @param color
 * @param format
 */
export function getColorString(color: Colord, format?: string): string {
  const innerFormat = getFormat(format);

  switch (innerFormat) {
    case 'rgb':
      return color.toRgbString();
    case 'hsl':
      return color.toHslString();
    default:
      return color.toHex();
  }
}

/**
 * 获取颜色的 RGB 字符串
 * Get RGB string of color
 *
 * @param color
 */
export function getRgbStr(color: Colord | AnyColor): string {
  const rgb = colord(color).toRgb();
  return `${rgb.r},${rgb.g},${rgb.b}`;
}

/**
 * 混合颜色
 * Mix color
 *
 * @param firstColor - 第一个颜色
 * @param secondColor - 第二个颜色
 * @param ratio - 第二个颜色的比例 (0 - 1)
 */
export function mixColor(
  firstColor: AnyColor,
  secondColor: AnyColor,
  ratio: number,
) {
  return colord(firstColor).mix(secondColor, ratio).toHex();
}
