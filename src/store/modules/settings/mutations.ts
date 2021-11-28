import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
  SetTheme = 'SET_THEME',
  SetUser = 'SET_USER',
}

export type Mutations<S = State> = {
  [MutationType.SetTheme](state: S, payload: string): void;
  [MutationType.SetUser](state: S, payload: State): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetTheme]: (state, payload) => {
    state.theme = payload;
  },
  [MutationType.SetUser]: (state, payload) => {
    state.userInfo = payload.userInfo;
  },
};
