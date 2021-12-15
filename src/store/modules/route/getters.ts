import { State } from '@/store/modules/route/state';
import { GetterTree } from 'vuex';
import { RootState } from '@/store';

export enum GettersType {
  GET_ASYNC_ROUTER = 'GET_ASYNC_ROUTER',
}

export type Getters = {
  [GettersType.GET_ASYNC_ROUTER](state: State): Array<any>;
};

export const getters: GetterTree<State, RootState> & Getters = {
  [GettersType.GET_ASYNC_ROUTER]: (state) => state.asyncRouters,
};
