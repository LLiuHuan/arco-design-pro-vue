import designSetting from '@/settings/designSetting';

const { Theme } = designSetting;

export type State = {
  //主题
  theme: string;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
  };
};

export const state: State = {
  theme: Theme,
};
