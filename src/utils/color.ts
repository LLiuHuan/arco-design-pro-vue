import { useUserStore } from '@/store/modules/users';
import { generate, getRgbStr } from '@arco-design/color';

export const setBaseColor = (val: string, model?: string) => {
  const userStore = useUserStore();
  for (let i = 1; i < 10; i++) {
    document.body.style.setProperty(
      `--arcoblue-${i}`,
      getRgbStr(
        generate(val, { index: i, dark: model ? model === 'dark' : userStore.getModel === 'dark' })
      )
    );
  }
};
