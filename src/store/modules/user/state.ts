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
    sideMode: 'light',
    activeColor: '77, 112, 255',
    baseColor: '77, 112, 255',
    language: 'zh-CN',
  },
  token: '',
};
