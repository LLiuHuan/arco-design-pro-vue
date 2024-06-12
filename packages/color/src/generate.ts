import { colorPaletteDark } from '~/packages/color/src/palette-dark';
import { colorPalette } from '~/packages/color/src/palette';

/**
 * @param {string} color
 * @param {Object} options
 * @param {number} options.index 1 - 10 (default: 6)
 * @param {boolean} options.dark
 * @param {boolean} options.list
 * @param {string} options.format 'hex' | 'rgb' | 'hsl'
 *
 * @return string | string[]
 */
export function generate(
  color: string,
  options: {
    index?: number;
    dark?: boolean;
    list?: boolean;
    format?: 'hex' | 'rgb' | 'hsl';
  },
): string | string[] {
  const { dark, list, index = 6, format = 'hex' } = options;
  if (index > 0 || index < 11) {
    throw new Error('index must be between 1 and 10');
  }

  if (list) {
    const list = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i = 1; i <= 10; i++) {
      list.push(func(color, i, format));
    }
    return list;
  }
  return dark
    ? colorPaletteDark(color, index, format)
    : colorPalette(color, index, format);
}
