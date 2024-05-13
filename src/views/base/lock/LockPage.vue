<template>
  <div class="fixed inset-0 flex-center wh-full bg-black z-999999">
    <div
      class="absolute wh-full text-gray-300 xl:text-xl 2xl:text-3xl text-center enter-y"
    >
      <div
        v-show="showDate"
        class="absolute top-0 left-1/2 flex pt-5 h-16 items-center justify-center sm:text-md xl:text-xl text-white flex-col cursor-pointer transform translate-x-1/2"
        :class="`transform translate-x-1/2`"
        @click="handleShowForm(false)"
      >
        <SvgIcon icon="ph:lock" />
        <span>{{ $t('sys.lock.unlock') }}</span>
      </div>

      <div class="flex w-screen h-screen justify-center items-center">
        <div
          class="relative mr-5 md:mr-20 w-2/5 h-2/5 md:h-4/5 flex-center rounded-30px bg-[#141313] color-[#bababa] font-weight-700"
          :class="`sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px`"
        >
          <span>{{ hour }}</span>
          <span
            v-show="showDate"
            class="meridiem absolute left-5 top-5 text-md xl:text-xl"
          >
            {{ meridiem }}
          </span>
        </div>
        <div
          class="w-2/5 h-2/5 md:h-4/5 flex-center rounded-30px bg-[#141313] color-[#bababa] font-weight-700"
          :class="`sm:text-90px md:text-160px lg:text-220px xl:text-260px 2xl:text-320px`"
        >
          <span> {{ minute }}</span>
        </div>
      </div>

      <transition name="fade-slide">
        <div
          v-show="!showDate"
          class="flex-center absolute-tl wh-full bg-[rgba(0,0,0,0.5)]"
          style="backdrop-filter: blur(8px)"
        >
          <div class="w-260px">
            <div class="text-center enter-x">
              <img
                :src="authStore.getUserInfo.avatar || userAvatar"
                class="w-70px m-0 rounded-50%"
              />
              <p class="mt-5px text-[#bababa] font-500">
                {{ authStore.getUserInfo.userName }}
              </p>
            </div>
            <AForm :model="lockForm">
              <AFormItem field="password" hide-label>
                <AInputPassword
                  v-model:model-value="lockForm.password"
                  :placeholder="$t('sys.lock.placeholder')"
                  class="enter-x"
                  allow-clear
                  autocomplete="off"
                />
              </AFormItem>
              <span
                v-if="errMsg"
                class="inline-block text-14px text-red enter-x"
              >
                {{ $t('sys.lock.alert') }}
              </span>
              <div class="flex justify-between enter-x">
                <AButton
                  type="text"
                  size="small"
                  class="mt-2 mr-2 enter-x"
                  :disabled="loading"
                  @click="handleShowForm(true)"
                >
                  {{ $t('common.back') }}
                </AButton>
                <AButton
                  type="text"
                  size="small"
                  class="mt-2 mr-2 enter-x"
                  :disabled="loading"
                  @click="goLogin"
                >
                  {{ $t('sys.lock.backToLogin') }}
                </AButton>
                <AButton
                  class="mt-2"
                  type="text"
                  size="small"
                  :loading="loading"
                  @click="unLock()"
                >
                  {{ $t('sys.lock.entry') }}
                </AButton>
              </div>
            </AForm>
          </div>
        </div>
      </transition>

      <div
        class="absolute bottom-5 w-full text-gray-300 xl:text-xl 2xl:text-3xl text-center enter-y"
      >
        <div v-show="!showDate" class="text-5xl mb-4 enter-x">
          {{ hour }}:{{ minute }} <span class="text-3xl">{{ meridiem }}</span>
        </div>
        <div class="text-2xl">{{ year }}/{{ month }}/{{ day }} {{ week }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, ref } from 'vue';
  import { SvgIcon } from '@/components/Icon';
  import { useAuthStore } from '@/store/modules/auth';
  import userAvatar from '@/assets/images/userAvatar.jpg';
  import { useLoading } from '@adp/hooks';
  import { useLockStore } from '@/store/modules/lock';
  import { useAuth } from '@/hooks/web/useAuth';
  import { useNow } from './useNow';

  const authStore = useAuthStore();
  const lockStore = useLockStore();

  const auth = useAuth();

  const lockForm = reactive({
    password: '',
  });
  const showDate = ref(true);
  const errMsg = ref(false);
  const { loading, startLoading, endLoading } = useLoading();

  const { hour, month, minute, meridiem, year, day, week } = useNow(true);

  /**
   * @description: unLock
   */
  async function unLock() {
    if (!lockForm.password) {
      return;
    }
    const pwd = lockForm.password;
    try {
      startLoading();
      const res = await lockStore.unLock(pwd);
      errMsg.value = !res;
    } finally {
      endLoading();
    }
  }

  function goLogin() {
    // 主动登出，不带redirect地址
    auth.logout();
    lockStore.resetLockInfo();
  }

  function handleShowForm(show = false) {
    showDate.value = show;
  }
</script>

<style scoped></style>
