import { defineStore } from 'pinia';
import { createStorage, storage } from '@/utils/storage';
import { ACCESS_TOKEN } from '@/store/mutation-types';
import { UserInfoType } from '@/store/state-types';
import { jsonInBlacklist, Login } from '@/api/base/login';
import { getUserInfo, setUserInfo } from '@/api/system/user';
import { Message } from '@arco-design/web-vue';

const Storage = createStorage({ storage: localStorage });

export interface IUserState {
  userInfo: UserInfoType;
  token: string;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): IUserState => ({
    userInfo: {
      uuid: '',
      nickName: '',
      headerImg: '',
      authority: {
        defaultRouter: '',
      },
      sideMode: 'light',
      activeColor: '77, 112, 255',
      baseColor: '77, 112, 255',
      language: 'zh-CN',
    },
    token: Storage.get(ACCESS_TOKEN, ''),
  }),
  getters: {
    getToken(): string {
      return this.token;
    },
    getUser(): UserInfoType {
      return this.userInfo;
    },
    getModel(): string {
      return this.userInfo.sideMode ?? 'light';
    },
    getBaseColor(): string {
      return this.userInfo.baseColor ?? '77, 112, 255';
    },
    getActiveColor(): string {
      return this.userInfo.activeColor ?? '77, 112, 255';
    },
    getLanguage(): string {
      return this.userInfo.language ?? 'zh-CN';
    },
  },
  actions: {
    setToken(token: string) {
      const ex = 24 * 60 * 60 * 1000;
      storage.set(ACCESS_TOKEN, token, ex);
      this.token = token;
    },
    setUserInfo(info: UserInfoType) {
      this.userInfo = info;
    },
    async setMode(model: string) {
      const res = await setUserInfo({ sideMode: model });
      if (res) {
        this.userInfo.sideMode = model;
        Message.success('设置成功');
      }
    },
    async setBaseColor(baseColor) {
      const res = await setUserInfo({ baseColor: baseColor });
      if (res) {
        this.userInfo.baseColor = baseColor;
        Message.success('设置成功');
      }
    },
    async setLanguage(language) {
      const res = await setUserInfo({ language: language });
      if (res) {
        this.userInfo.language = language;
        Message.success('设置成功');
      }
    },
    async setActiveColor(activeColor) {
      const res = await setUserInfo({ activeColor: activeColor });
      if (res) {
        this.userInfo.activeColor = activeColor;
        Message.success('设置成功');
      }
    },
    async getUserInfo() {
      const data = await getUserInfo();
      this.setUserInfo(data);
      return data.userInfo;
    },
    async login(userInfo) {
      try {
        const res = await Login(userInfo);
        this.setToken(res.token);
        this.setUserInfo(res.user);
        return Promise.resolve(res);
      } catch (e) {
        return Promise.reject(e);
      }
    },
    async logout() {
      const res = await jsonInBlacklist();
      if (res) {
        this.userInfo = {
          uuid: '',
          nickName: '',
        };
        this.token = '';
        localStorage.clear();
        window.location.reload();
      }
    },
  },
});
