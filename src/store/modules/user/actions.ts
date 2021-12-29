import { ActionContext, ActionTree } from 'vuex';
import { RootState } from '@/store';
import { Mutations, MutationType } from '@/store/modules/user/mutations';
import { jsonInBlacklist, Login } from '@/api/base/login';
import { LoginTypes } from '@/api/base/login-types';
import { State } from '@/store/modules/user/state';
import { getUserInfo, setUserInfo } from '@/api/system/user';
import { Message } from '@arco-design/web-vue';

export enum ActionsType {
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
  SET_MODE = 'SET_MODE',
  SET_BASE_COLOR = 'SET_BASE_COLOR',
  SET_LANGUAGE = 'SET_LANGUAGE',
  GET_USER_INFO = 'GET_USER_INFO',
}

type ActionAugments = Omit<ActionContext<State, RootState>, 'commit'> & {
  commit<K extends keyof Mutations>(
    key: K,
    payload?: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
};

export type Actions = {
  [ActionsType.LOGIN](context: ActionAugments, payload: LoginTypes): any;
  [ActionsType.LOGOUT](context: ActionAugments, payload: State): any;
  [ActionsType.SET_MODE](context: ActionAugments, payload: string): void;
  [ActionsType.SET_BASE_COLOR](context: ActionAugments, payload: string): void;
  [ActionsType.SET_LANGUAGE](context: ActionAugments, payload: string): void;
  [ActionsType.GET_USER_INFO](context: ActionAugments): any;
};

export const actions: ActionTree<State, RootState> & Actions = {
  // async [ActionsType.LOGIN]({ commit, dispatch, rootGetters, getters }, payload) {
  async [ActionsType.LOGIN]({ commit }, payload) {
    const res = await Login(payload);
    commit(MutationType.SET_USER_INFO, res.user);
    commit(MutationType.SET_TOKEN, res.token);
    // await dispatch('router/SetAsyncRouter', {}, { root: true });
    // const asyncRouters = rootGetters['router/asyncRouters'];
    // asyncRouters.forEach((asyncRouter) => {
    //   router.addRoute(asyncRouter);
    // });
    // await router.push({ name: getters['userInfo'].authorityTypes.defaultRouter || '/' });
    return true;
  },
  async [ActionsType.LOGOUT]({ commit }) {
    const res = await jsonInBlacklist();
    if (res) {
      commit(MutationType.LOGOUT);
      return true;
    }
    return false;
  },
  async [ActionsType.SET_MODE]({ commit }, payload) {
    const res = await setUserInfo({ sideMode: payload });
    if (res) {
      commit(MutationType.SET_MODE, payload);
      Message.success('设置成功');
    }
  },
  async [ActionsType.SET_BASE_COLOR]({ commit }, payload) {
    const res = await setUserInfo({ baseColor: payload });
    if (res) {
      commit(MutationType.SET_BASE_COLOR, payload);
      Message.success('设置成功');
    }
  },
  async [ActionsType.SET_LANGUAGE]({ commit }, payload) {
    const res = await setUserInfo({ language: payload });
    if (res) {
      commit(MutationType.SET_LANGUAGE, payload);
      Message.success('设置成功');
    }
  },
  async [ActionsType.GET_USER_INFO]({ commit }) {
    const data = await getUserInfo();
    commit(MutationType.SET_USER_INFO, data.userInfo);
    return data.userInfo;
  },
};
