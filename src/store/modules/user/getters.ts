import { State } from '@/store/modules/user/state';
import { GetterTree } from 'vuex';
import { RootState } from '@/store';
import { UserInfoType } from '@/store/modules/user/state-types';

export enum GettersType {
  GET_TOKEN = 'GET_TOKEN',
  GET_USER = 'GET_USER',
  GET_MODE = 'GET_MODE',
  GET_BASE_COLOR = 'GET_BASE_COLOR',
  GET_ACTIVE_COLOR = 'GET_ACTIVE_COLOR',
  GET_LANGUAGE = 'GET_LANGUAGE',
}

export type Getters = {
  [GettersType.GET_TOKEN](state: State): string;
  [GettersType.GET_USER](state: State): UserInfoType | undefined;
  [GettersType.GET_MODE](state: State): string;
  [GettersType.GET_BASE_COLOR](state: State): string;
  [GettersType.GET_ACTIVE_COLOR](state: State): string;
  [GettersType.GET_LANGUAGE](state: State): string;
};

export const getters: GetterTree<State, RootState> & Getters = {
  [GettersType.GET_TOKEN]: (state) => state.token,
  [GettersType.GET_USER]: (state) => state.userInfo,
  [GettersType.GET_MODE]: (state) => state.userInfo.sideMode ?? 'light',
  [GettersType.GET_BASE_COLOR]: (state) => state.userInfo.baseColor ?? '77, 112, 255',
  [GettersType.GET_ACTIVE_COLOR]: (state) => state.userInfo.activeColor ?? '77, 112, 255',
  [GettersType.GET_LANGUAGE]: (state) => state.userInfo.language ?? 'zh-CN',
};
