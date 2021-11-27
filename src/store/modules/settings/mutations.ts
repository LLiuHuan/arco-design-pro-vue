import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
  SetTheme = 'SET_THEME',
}

export type Mutations<S = State> = {
  [MutationType.SetTheme](state: S, payload: string): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SetTheme]: (state, payload) => {
    state.Theme = payload;
  },
};
