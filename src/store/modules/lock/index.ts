import { defineStore } from 'pinia';
import { LockInfo } from '~/types/storage';
import { localStg } from '@/utils/cache';
import { LOCK_INFO_KEY, StoreEnum } from '@/enums';
import { ref } from 'vue';

export const useLockStore = defineStore(StoreEnum.Lock, () => {
  const lockInfo = ref(localStg.get(LOCK_INFO_KEY) as LockInfo);

  function setLockInfo(info: LockInfo) {
    lockInfo.value = { ...lockInfo.value, ...info };
    localStg.set(LOCK_INFO_KEY, lockInfo.value);
  }

  function resetLockInfo() {
    localStg.remove(LOCK_INFO_KEY);
    lockInfo.value = {};
  }

  async function unLock(password?: string) {
    // const authStore = useAuthStore();
    if (lockInfo.value?.pwd === password) {
      resetLockInfo();
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
  }

  return {
    lockInfo,

    unLock,
    resetLockInfo,
    setLockInfo,
  };
});
