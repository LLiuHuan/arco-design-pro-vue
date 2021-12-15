import designSetting from '@/settings/designSetting';
import projectSetting from '@/settings/projectSetting';

const { Theme } = designSetting;
const { permissionMode } = projectSetting;

export type State = {
  //主题
  theme: string;
  loading: boolean; // TODO: 临时测试，无用
  permissionMode: string;
};

export const state: State = {
  theme: Theme,
  loading: false,
  permissionMode: permissionMode,
};
