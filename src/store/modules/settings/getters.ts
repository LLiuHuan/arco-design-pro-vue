import { State } from '@/store/modules/settings/state';
import { GetterTree } from 'vuex';
import { RootState } from '@/store';

export enum GettersType {
  GET_THEME = 'GET_THEME',
  GET_LOADING = 'GET_LOADING',
}

export type Getters = {
  [GettersType.GET_THEME](state: State): string;
  [GettersType.GET_LOADING](state: State): boolean;
};

export const getters: GetterTree<State, RootState> & Getters = {
  [GettersType.GET_THEME]: (state) => state.theme,
  [GettersType.GET_LOADING]: (state) => state.loading,
};
