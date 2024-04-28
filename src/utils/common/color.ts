import { generate, getRgbStr } from '@arco-design/color';
import { ThemeColorEnum } from '@/enums';

export const setBaseColor = (
  val: string,
  key: ThemeColorEnum,
  dark: boolean = false,
) => {
  const colors = generate(val, { dark, list: true, format: 'hex' });
  for (let i = 0; i < colors.length; i += 1) {
    document.body.style.setProperty(`--${key}-${i + 1}`, getRgbStr(colors[i]));
    // document.documentElement.style.setProperty(
    //   `--${key}-${i + 1}`,
    //   getRgbStr(colors[i]),
    // );
  }
};
