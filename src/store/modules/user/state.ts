import { UserInfoType } from '@/store/modules/user/state-types';

export type State = {
  userInfo: UserInfoType;
  token: string;
};

export const state: State = {
  userInfo: {
    uuid: '',
    nickName: '',
    headerImg: '',
    authority: {},
    sideMode: 'dark',
    activeColor: '#4D70FF',
    baseColor: '#fff',
    language: 'zh-CN',
  },
  token: '',
};
