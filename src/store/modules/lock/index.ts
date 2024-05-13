import { defineStore } from 'pinia';
import { LockInfo } from '~/types/storage';
import { localStg } from '@/utils/cache';
import { LOCK_INFO_KEY } from '@/enums';

interface LockState {
  lockInfo: Nullable<LockInfo>;
}

export const useLockStore = defineStore({
  id: 'app-lock',
  state: (): LockState => ({
    lockInfo: localStg.get(LOCK_INFO_KEY),
  }),
  getters: {
    getLockInfo(state): Nullable<LockInfo> {
      return state.lockInfo;
    },
  },
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = { ...this.lockInfo, ...info };
      localStg.set(LOCK_INFO_KEY, this.lockInfo);
    },
    resetLockInfo() {
      localStg.remove(LOCK_INFO_KEY);
      this.lockInfo = null;
    },
    async unLock(password?: string) {
      // const authStore = useAuthStoreWithOut();
      if (this.lockInfo?.pwd === password) {
        this.resetLockInfo();
        return true;
      }
      return false;
      // // Try to login
      // const tryLogin = async () => {
      //   const auth = useAuth();
      //   try {
      //     const res = await auth.login(authStore.getUserInfo?.user, password!);
      //     if (res) {
      //       this.resetLockInfo();
      //     }
      //
      //     return res;
      //   } catch (error) {
      //     return false;
      //   }
      // };
      //
      // return tryLogin();
    },
  },
});
