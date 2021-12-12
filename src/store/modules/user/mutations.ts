import { State } from './state';
import { MutationTree } from 'vuex';
import { UserInfoType } from '@/store/modules/user/state-types';

export enum MutationType {
  SET_USER_INFO = 'SET_USER_INFO',
  SET_TOKEN = 'SET_TOKEN',
  LOGOUT = 'LOGOUT',
  RESET_USER_INFO = 'RESET_USER_INFO',
  SET_MODE = 'SET_MODE',
  SET_BASE_COLOR = 'SET_BASE_COLOR',
  SET_LANGUAGE = 'SET_LANGUAGE',
}

export type Mutations<S = State> = {
  [MutationType.SET_USER_INFO](state: S, payload: UserInfoType): void;
  [MutationType.SET_TOKEN](state: S, payload: string): void;
  [MutationType.LOGOUT](state: S): void;
  [MutationType.RESET_USER_INFO](state: S, payload: Object): void;
  [MutationType.SET_MODE](state: S, payload: string): void;
  [MutationType.SET_BASE_COLOR](state: S, payload: string): void;
  [MutationType.SET_LANGUAGE](state: S, payload: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_USER_INFO]: (state, payload) => {
    state.userInfo = payload;
  },
  [MutationType.SET_TOKEN]: (state, payload) => (state.token = payload),
  [MutationType.LOGOUT]: (state) => {
    state.userInfo = {
      uuid: '',
      nickName: '',
    };
    state.token = '';
    localStorage.clear();
    window.location.reload();
  },
  [MutationType.RESET_USER_INFO]: (state, payload) =>
    (state.userInfo = { ...state.userInfo, ...payload }),
  [MutationType.SET_MODE]: (state, payload) => (state.userInfo.sideMode = payload),
  [MutationType.SET_BASE_COLOR]: (state, payload) => (state.userInfo.baseColor = payload),
  [MutationType.SET_LANGUAGE]: (state, payload) => (state.userInfo.language = payload),
};
