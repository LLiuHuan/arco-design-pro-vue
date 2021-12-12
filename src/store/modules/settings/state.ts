import designSetting from '@/settings/designSetting';

const { Theme } = designSetting;

export type State = {
  //主题
  theme: string;
  loading: boolean;
};

export const state: State = {
  theme: Theme,
  loading: false,
};
