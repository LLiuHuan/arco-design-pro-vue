import { Store as VuexStore, Module, CommitOptions, DispatchOptions } from 'vuex';
import { RootState } from '@/store';

import type { State } from './state';
import { getters, Getters } from './getters';
import { state } from './state';
import { Mutations, mutations } from './mutations';
import { Actions, actions } from './actions';

export { State };

export type RouteStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
} & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload?: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload?: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
