import { ActionContext, ActionTree } from 'vuex';
import { State } from './state';
import { RootState } from '@/store';
import { Mutations, MutationType } from './mutations';

export enum ActionsType {
  SetTheme = 'SET_THEME',
  SetUser = 'SET_USER',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionsType.SetTheme](context: ActionAugments, payload: string): any;
  [ActionsType.SetUser](context: ActionAugments, payload: State): any;
};

export const actions: ActionTree<State, RootState> & Actions = {
  async [ActionsType.SetTheme]({ commit }, payload) {
    commit(MutationType.SetTheme, payload);
  },
  async [ActionsType.SetUser]({ commit }, payload) {
    commit(MutationType.SetUser, payload);
  },
};
