import { generate, getRgbStr } from '@arco-design/color';
import { ThemeColorEnum } from '@/enums';
import { setCssVar } from './domUtils';

export const setBaseColor = (
  val: string,
  key: ThemeColorEnum,
  dark: boolean = false,
) => {
  const colors = generate(val, { dark, list: true, format: 'hex' });
  for (let i = 1; i <= colors.length; i += 1) {
    // document.body.style.setProperty(`--${key}-${i}`, getRgbStr(colors[i]));
    setCssVar(`--${key}-${i}`, getRgbStr(colors[i]), document.body);
  }
};
