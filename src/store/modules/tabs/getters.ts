import { State } from '@/store/modules/tabs/state';
import { RouteItem } from '/#/config';
import { GetterTree } from 'vuex';
import { RootState } from '@/store';

export type Getters = {
  getTabsList(state: State): RouteItem[];
};

export const getters: GetterTree<State, RootState> & Getters = {
  getTabsList: (state) => state.tabsList,
};
