// 不需要出现在标签页中的路由
import { State } from '@/store/modules/tabs/state';
import { RouteItem } from '/#/config';
import { MutationTree } from 'vuex';
import { TABS_ROUTES } from '@/store/modules/tabs/mutations-types';

const whiteList = ['Redirect', 'login'];

export enum MutationType {
  SET_INIT_TABS = 'SET_INIT_TABS',
  SET_ADD_TABS = 'SET_ADD_TABS',
  SET_CLOSE_LEFT_TABS = 'SET_CLOSE_LEFT_TABS',
  SET_CLOSE_RIGHT_TABS = 'SET_CLOSE_RIGHT_TABS',
  SET_CLOSE_OTHER_TABS = 'SET_CLOSE_OTHER_TABS',
  SET_CLOSE_CURRENT_TABS = 'SET_CLOSE_CURRENT_TABS',
  SET_CLOSE_ALL_TABS = 'SET_CLOSE_ALL_TABS',
}

export type Mutations<S = State> = {
  [MutationType.SET_INIT_TABS](state: S, payload: RouteItem[]): void;
  [MutationType.SET_ADD_TABS](state: S, payload: RouteItem): boolean;
  [MutationType.SET_CLOSE_LEFT_TABS](state: S, payload: RouteItem): void;
  [MutationType.SET_CLOSE_RIGHT_TABS](state: S, payload: RouteItem): void;
  [MutationType.SET_CLOSE_OTHER_TABS](state: S, payload: RouteItem): void;
  [MutationType.SET_CLOSE_CURRENT_TABS](state: S, payload: RouteItem): void;
  [MutationType.SET_CLOSE_ALL_TABS](state: S): void;
};

export const mutations: MutationTree<State> & Mutations = {
  [MutationType.SET_INIT_TABS]: (state, payload) => {
    // 初始化标签页
    state.tabsList = payload;
  },
  [MutationType.SET_ADD_TABS]: (state, payload) => {
    // 添加标签页
    if (whiteList.includes(payload.name)) return false;
    const isExists = state.tabsList.some((item) => item.fullPath == payload.fullPath);
    if (!isExists) {
      state.tabsList.push(payload);
    }
    return true;
  },
  [MutationType.SET_CLOSE_LEFT_TABS]: (state, payload) => {
    // 关闭左侧
    const index = state.tabsList.findIndex((item) => item.fullPath == payload.fullPath);
    state.tabsList.splice(0, index);
  },
  [MutationType.SET_CLOSE_RIGHT_TABS]: (state, payload) => {
    // 关闭右侧
    const index = state.tabsList.findIndex((item) => item.fullPath == payload.fullPath);
    state.tabsList.splice(index + 1);
  },
  [MutationType.SET_CLOSE_OTHER_TABS]: (state, payload) => {
    // 关闭其他
    state.tabsList = state.tabsList.filter((item) => item.fullPath == payload.fullPath);
  },
  [MutationType.SET_CLOSE_CURRENT_TABS]: (state, payload) => {
    // 关闭当前页
    const index = state.tabsList.findIndex((item) => item.fullPath == payload.fullPath);
    state.tabsList.splice(index, 1);
  },
  [MutationType.SET_CLOSE_ALL_TABS]: (state) => {
    // 关闭全部
    state.tabsList = [];
    localStorage.removeItem(TABS_ROUTES);
  },
};
