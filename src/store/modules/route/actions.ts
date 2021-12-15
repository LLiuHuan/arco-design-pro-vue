import { ActionContext, ActionTree } from 'vuex';
import { State } from './state';
import { RootState } from '@/store';
import { Mutations, MutationType } from './mutations';

export enum ActionsType {
  SET_ASYNC_ROUTER = 'SET_ASYNC_ROUTER',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionsType.SET_ASYNC_ROUTER](context: ActionAugments, payload: Array<any>): any;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionsType.SET_ASYNC_ROUTER]({ commit }, payload) {
    commit(MutationType.SET_ASYNC_ROUTER, payload);
  },
};
