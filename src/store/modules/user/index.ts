import type { State } from './state';
import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from 'vuex';
import { getters, Getters } from './getters';
import { mutations, Mutations } from './mutations';
import { actions, Actions } from './actions';
import { RootState } from '@/store';
import { state } from './state';

export { State };

export type UserStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
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
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
};

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
  actions,
};
