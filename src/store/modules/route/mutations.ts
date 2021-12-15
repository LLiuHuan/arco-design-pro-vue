import { State } from './state';
import { MutationTree } from 'vuex';

export enum MutationType {
  SET_ASYNC_ROUTER = 'SET_ASYNC_ROUTER',
}

export type Mutations<S = State> = {
  [MutationType.SET_ASYNC_ROUTER](state: S, payload: Array<any>): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_ASYNC_ROUTER]: (state, payload) => {
    state.asyncRouters = payload;
  },
};
