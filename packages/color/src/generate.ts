import { colorPaletteDark } from './palette-dark';
import { colorPalette } from './palette';

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
  if (index < 1 || index > 10) {
    throw new Error('index should be between 1 and 10');
  }

  if (list) {
    const listItem = [];
    const func = dark ? colorPaletteDark : colorPalette;
    for (let i = 1; i <= 10; i += 1) {
      listItem.push(func(color, i, format));
    }
    return listItem;
  }
  return dark
    ? colorPaletteDark(color, index, format)
    : colorPalette(color, index, format);
}
