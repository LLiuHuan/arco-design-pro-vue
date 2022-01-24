<template>
  <div class="navbar">
    <div class="left">
      <Logo />
    </div>
    <ul class="right">
      <li>
        <a target="_blank" :href="docs"><IconGithub /></a>
      </li>
      <li>
        <a-tooltip :content="language === 'en-US' ? '点击切换为中文' : '点击切换为英文'">
          <a-button
            @click="setLang(language === 'en-US' ? 'zh-CN' : 'en-US')"
            class="p-0 w-8 h-8"
            type="text"
            style="font-size: 20px"
          >
            <icon-chinese-fill v-if="language === 'en-US'" />
            <icon-english-fill v-else />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
          <a-button
            @click="changeTheme(theme === 'light' ? 'dark' : 'light')"
            class="p-0 w-8 h-8"
            type="text"
            style="font-size: 20px"
          >
            <icon-moon-fill v-if="theme === 'light'" />
            <icon-sun-fill v-else />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-tooltip content="点击切换为全屏模式">
          <a-button
            @click="toggleFullScreen"
            class="p-0 w-8 h-8"
            type="text"
            style="font-size: 20px"
          >
            <icon-fullscreen v-if="!fullscreen" />
            <icon-fullscreen-exit v-else />
          </a-button>
        </a-tooltip>
      </li>
      <li>
        <a-avatar class="mr-2" :size="24" :style="{ backgroundColor: '#14a9f8', marginRight: 8 }">{{
          userInfo.nickName
        }}</a-avatar>
        <a-dropdown>
          <a-typography-text> {{ userInfo.nickName }} </a-typography-text>
          <template #content>
            <a-doption>
              <span style="font-weight: 600">
                当前角色：{{ userInfo?.authority?.authorityName }}
              </span>
            </a-doption>
            <template v-if="userInfo.authorities">
              <a-doption
                v-for="item in userInfo.authorities.filter(
                  (i) => i.authorityId !== userInfo.authorityId
                )"
                :key="item.authorityId"
                @click="changeUserAuth(item.authorityId)"
              >
                <span> 切换为：{{ item.authorityName }} </span>
              </a-doption>
            </template>
            <a-doption @click="logout">登出</a-doption>
          </template>
        </a-dropdown>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import Logo from '@/layout/components/Logo/index.vue';
  import { useI18n } from 'vue-i18n';
  import { storage } from '@/utils/storage';
  import { setUserAuthority } from '@/api/system/user';
  import { emitter } from '@/utils/bus';
  import { useRouter } from 'vue-router';
  import { IconGithub } from '@arco-design/web-vue/es/icon';
  import { useUserStore } from '@/store/modules/users';
  import { UserInfoType } from '@/store/state-types';

  export default defineComponent({
    name: 'NavBar',
    components: {
      Logo,

      IconGithub,
    },
    setup() {
      const usersStore = useUserStore();
      const router = useRouter();
      const state = reactive({
        options: [
          { label: '中文', value: 'zh-CN' },
          { label: 'English', value: 'en-US' },
        ],
        language: ref<string | undefined>(usersStore.getLanguage),
        theme: ref<string | undefined>(usersStore.getModel), // light
        docs: 'https://github.com/LLiuHuan',
        fullscreen: false,
        userInfo: {} as UserInfoType,
      });
      // 使用i18n
      const { locale } = useI18n({ useScope: 'global' });

      locale.value = state.language ? state.language : 'zh-CN';

      // 修改语言
      const setLang = (value: string | undefined) => {
        if (value) {
          if (value == state.language) return;
          locale.value = value;
          state.language = value;
          usersStore.setLanguage(value);
          storage.set('app-lang', value ? value : 'zh-CN');
          location.replace(location.href);
        }
      };

      // 修改亮色/黑暗模式
      const changeTheme = (newTheme: string) => {
        if (newTheme === 'dark') {
          document.body.setAttribute('arco-theme', 'dark');
        } else {
          document.body.removeAttribute('arco-theme');
        }
        if (newTheme == state.theme) return;
        usersStore.setMode(newTheme);
        state.theme = newTheme;
      };

      // 全屏切换
      const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen();
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
      };

      // 切换全屏图标
      const toggleFullscreenIcon = () => (state.fullscreen = document.fullscreenElement !== null);

      // 监听全屏切换事件
      document.addEventListener('fullscreenchange', toggleFullscreenIcon);

      const logout = async () => {
        await usersStore.logout();
      };

      // 切换角色
      const changeUserAuth = async (id) => {
        await setUserAuthority({
          authorityId: id,
        }).then(() => {
          emitter.emit('closeAllPage');

          usersStore.getUserInfo().then((data) => {
            state.userInfo = data;
            router.replace(data.authority.defaultRouter);
            setTimeout(() => {
              window.location.reload();
            }, 100);
          });
        });
      };

      onBeforeMount(() => {
        usersStore.getUserInfo().then((data) => {
          state.userInfo = data;
        });

        changeTheme(state.theme as string);
        setLang(state.language);
      });

      return {
        ...toRefs(state),
        changeTheme,
        setLang,
        toggleFullScreen,
        logout,
        changeUserAuth,
      };
    },
  });
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';

  button {
    padding: 0 !important;
  }
</style>
