import { ThemeColorEnum } from '@/enums';
import { ThemeSettingColors } from '~/types/config';
import { generate, getRgbStr } from '@adp/color';
import { setCssVar } from './domUtils';

const addThemeVarsToTtml = (cssVar: string, darkCssVar: string) => {
  const css = `
  body {
  ${cssVar}
  }
  `;

  const darkCss = `
  body[arco-theme=dark] {
  ${darkCssVar}
  }
  `;
  const styleId = 'theme-vars';

  const style =
    document.querySelector(`#${styleId}`) || document.createElement('style');

  style.id = styleId;

  style.textContent = css + darkCss;

  document.head.appendChild(style);
};

export const setThemeColors = (colors: ThemeSettingColors) => {
  let cssStr = ``;
  let darkCssStr = ``;
  Object.keys(colors).forEach((key: ThemeColorEnum) => {
    const cssColors = generate(colors[key], { list: true, format: 'hex' });
    const darkCssColors = generate(colors[key], {
      list: true,
      format: 'hex',
      dark: true,
    });

    for (let i = 1; i < cssColors.length; i += 1) {
      cssStr += `--${key}-${i}: ${getRgbStr(cssColors[i])};`;
      darkCssStr += `--${key}-${i}: ${getRgbStr(darkCssColors[i])};`;
    }
  });
  addThemeVarsToTtml(cssStr, darkCssStr);
};

export const setBaseColors = (
  val: string,
  key: string,
  dark: boolean = false,
) => {
  const colors = generate(val, { dark, list: true, format: 'hex' });
  for (let i = 1; i <= colors.length; i += 1) {
    // document.body.style.setProperty(`--${key}-${i}`, getRgbStr(colors[i]));
    setCssVar(`--${key}-${i}`, getRgbStr(colors[i]), document.body);
  }
};

/**
 * @description 设置主题
 * @description Set pro theme
 *
 * @param theme
 */
export const setProTheme = (theme: string) => {
  return new Promise((resolve, reject) => {
    // 如果没有主题，移除主题
    if (!theme) {
      const proTheme = document.getElementById('pro-custom-theme');
      if (proTheme) {
        proTheme.setAttribute('href', '');
      }
      resolve('loaded');
    }

    const linkId = 'pro-custom-theme';
    const styleList = (document.body.getAttribute('style') || '')
      .split(';')
      .map((style) => style.trim())
      .filter((style) => style)
      .filter(
        (style) =>
          !style.startsWith(`--${ThemeColorEnum.PRIMARY}-`) &&
          !style.startsWith(`--${ThemeColorEnum.WARNING}-`) &&
          !style.startsWith(`--${ThemeColorEnum.SUCCESS}-`) &&
          !style.startsWith(`--${ThemeColorEnum.ERROR}-`),
      );
    document.body.setAttribute('style', styleList.join(';'));
    const proTheme =
      document.getElementById(linkId) || document.createElement('link');
    const link = proTheme?.cloneNode(true) as HTMLLinkElement;
    link.id = linkId;
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
    document.head.appendChild(link);
  });
};

// /**
//  * @description 还原主题
//  * @description Reset pro theme
//  */
// export const resetProTheme = () => {
//   const proTheme = document.getElementById('pro-custom-theme');
//   if (proTheme) {
//     proTheme.setAttribute('href', '');
//   }
// };
