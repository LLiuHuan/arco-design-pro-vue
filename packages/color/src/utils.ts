import { AnyColor, colord, Colord } from 'colord';

const formats = ['hex', 'rgb', 'hsl'];

function getFormat(format?: string): string {
  if (!format || formats.indexOf(format) < 0) {
    return 'hex';
  }
  return format;
}

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

export function getRgbStr(color: Colord | AnyColor): string {
  const rgb = colord(color).toRgb();
  return `${rgb.r},${rgb.g},${rgb.b}`;
}
