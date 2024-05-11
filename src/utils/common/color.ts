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

export const setProTheme = (theme: string) => {
  return new Promise((resolve, reject) => {
    const styleList = (document.body.getAttribute('style') || '')
      .split(';')
      .map((style) => style.trim())
      .filter((style) => style)
      .filter(
        (style) =>
          !style.startsWith('--primary-') &&
          !style.startsWith(`--${ThemeColorEnum.PRIMARY}-`) &&
          !style.startsWith(`--${ThemeColorEnum.WARNING}-`) &&
          !style.startsWith(`--${ThemeColorEnum.SUCCESS}-`) &&
          !style.startsWith(`--${ThemeColorEnum.ERROR}-`),
      );
    document.body.setAttribute('style', styleList.join(';'));
    const proTheme = document.getElementById('pro-custom-theme');
    const link = proTheme?.cloneNode(true) as HTMLLinkElement;
    link.href = theme ? `https://unpkg.com/${theme}/css/arco.css` : '';
    link.onload = () => {
      if (proTheme) {
        proTheme.parentElement?.removeChild(proTheme);
      }
      resolve('loaded');
    };
    link.onerror = (err) => {
      reject(err);
    };
    document.head.after(link);
  });
};

export const resetProTheme = () => {
  const proTheme = document.getElementById('pro-custom-theme');
  if (proTheme) {
    proTheme.setAttribute('href', '');
  }
};
