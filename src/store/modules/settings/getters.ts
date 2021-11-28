import { State } from '@/store/modules/settings/state';
import { GetterTree } from 'vuex';
import { RootState } from '@/store';

export type Getters = {
  getTheme(state: State): string;
  getUser(state: State): Object | undefined;
};

export const getters: GetterTree<State, RootState> & Getters = {
  getTheme: (state) => state.theme,
  getUser: (state) => state.userInfo,
};
