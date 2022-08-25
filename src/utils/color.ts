import { generate, getRgbStr } from '@arco-design/color';
import { useThemeStore } from '@/store';

export const setBaseColor = (val: string) => {
  const theme = useThemeStore();
  for (let i = 1; i < 10; i += 1) {
    document.body.style.setProperty(
      `--arcoblue-${i}`,
      getRgbStr(generate(val, { index: i, dark: theme.darkMode }))
    );
  }
};
