import { Store as VuexStore, Module, CommitOptions } from 'vuex';
import { RootState } from '@/store';

import type { State } from './state';
import { getters, Getters } from './getters';
import { state } from './state';
import { Mutations, mutations } from './mutations';

export { State };

export type TabsStore<S = State> = Omit<VuexStore<S>, 'getters' | 'commit' | 'dispatch'> & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  } & {
    commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
      key: K,
      payload?: P,
      options?: CommitOptions
    ): ReturnType<Mutations[K]>;
  };
};

export const store: Module<State, RootState> = {
  state,
  getters,
  mutations,
};
