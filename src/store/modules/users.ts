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
  avatar: string;
  permissions: any[];
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
    avatar: '',
    permissions: [],
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
    getPermissions(): string[] {
      return this.permissions;
    },
  },
  actions: {
    setToken(token: string) {
      const ex = 24 * 60 * 60 * 1000;
      storage.set(ACCESS_TOKEN, token, ex);
      this.token = token;
    },
    setAvatar(avatar: string) {
      this.avatar = avatar;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    setUserInfo(info: any) {
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
      this.setUserInfo(data.userInfo);
      return data.userInfo;
    },
    async NeedInit() {
      this.setToken('');
      localStorage.clear();
    },
    // 获取用户信息
    GetInfo() {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((res) => {
            const result = res.userInfo;
            if (result.permissions && result.permissions.length) {
              const permissionsList = result.permissions;
              this.setPermissions(permissionsList);
              this.setUserInfo(result);
            } else {
              this.setPermissions([]);
              reject(new Error('getInfo: permissionsList must be a non-null array !'));
            }
            this.setAvatar(result.avatar);
            resolve(result);
          })
          .catch((error) => {
            reject(error);
          });
      });
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
  // 开启数据缓存
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'app-user',
        storage: localStorage,
        // paths: ['name', 'age']
      },
    ],
  },
});
