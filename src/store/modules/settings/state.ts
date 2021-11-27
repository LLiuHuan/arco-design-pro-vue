import designSetting from '@/settings/designSetting';

const { Theme } = designSetting;

export type State = {
  //主题
  Theme: string;
};

export const state: State = {
  Theme: Theme,
};
