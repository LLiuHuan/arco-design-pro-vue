import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
  SET_THEME = 'SET_THEME',
  SET_LOADING = 'SET_LOADING',
}

export type Mutations<S = State> = {
  [MutationType.SET_THEME](state: S, payload: string): void;
  [MutationType.SET_LOADING](state: S, payload: boolean): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_THEME]: (state, payload) => {
    state.theme = payload;
  },
  [MutationType.SET_LOADING]: (state, payload) => {
    state.loading = payload;
  },
};
