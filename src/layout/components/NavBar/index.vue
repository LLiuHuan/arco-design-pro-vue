<template>
  <div class="navbar">
    <div class="left">
      <Logo />
    </div>
    <ul class="right">
      <li>
        <MessageBox />
      </li>
      <li>
        <!--        <a target="_blank" :href="docs">{{ $t('navbar.docs') }}</a>-->
        <a target="_blank" :href="docs"><icon-github /></a>
      </li>
      <li>
        <!--        <a-select v-components="language" @change="setLang(language)">-->
        <!--          <a-option v-for="opt in options" :key="opt.value" :value="opt.value">{{-->
        <!--            opt.label-->
        <!--          }}</a-option>-->
        <!--        </a-select>-->
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
        <a-avatar class="mr-2" :size="24" :style="{ backgroundColor: '#14a9f8', marginRight: 8 }"
          >Arco</a-avatar
        >
        <a-dropdown>
          <a-typography-text> 王立群 </a-typography-text>
          <template #content>
            <a-doption @click="logout">登出</a-doption>
          </template>
        </a-dropdown>
      </li>
      <!--      <li>-->
      <!--        <Avatar size={24} style={{ marginRight: 8 }}>-->
      <!--          <img alt="avatar" src={userInfo.avatar} />-->
      <!--        </Avatar>-->
      <!--        <Dropdown-->
      <!--          trigger="click"-->
      <!--          droplist={-->
      <!--        <MenuBox onClickMenuItem={onMenuItemClick}>-->
      <!--          <MenuBox.Item key="logout">登出</MenuBox.Item>-->
      <!--        </MenuBox>-->
      <!--        }-->
      <!--        >-->
      <!--        <Typography.Text class={styles.username}>{userInfo.name}</Typography.Text>-->
      <!--        </Dropdown>-->
      <!--      </li>-->
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import Logo from '@/layout/components/Logo/index.vue';
  import MessageBox from '@/layout/components/MessageBox/index.vue';
  import { useI18n } from 'vue-i18n';
  import { useStore } from 'vuex';
  import { ActionsType } from '@/store/modules/user/actions';
  import { GettersType } from '@/store/modules/user/getters';
  import { storage } from '@/utils/storage';
  export default defineComponent({
    name: 'NavBar',
    components: {
      Logo,
      MessageBox,
    },
    setup() {
      const store = useStore();
      const state = reactive({
        options: [
          { label: '中文', value: 'zh-CN' },
          { label: 'English', value: 'en-US' },
        ],
        language: ref<string | null>(store.getters[GettersType.GET_LANGUAGE]),
        theme: store.getters[GettersType.GET_MODE], // light
        docs: 'https://arco.design/vue/docs/start',
        fullscreen: false,
      });
      // 使用i18n
      const { locale } = useI18n({ useScope: 'global' });

      locale.value = state.language ? state.language : 'zh-CN';

      // 修改语言
      const setLang = (value: string | null) => {
        if (value) {
          locale.value = value;
          state.language = value;
          store.dispatch(ActionsType.SET_LANGUAGE, value);
          storage.set('lang', value ? value : 'zh-CN');
          location.replace(location.href);
        }
      };

      // 修改亮色/黑暗模式
      const changeTheme = (newTheme: string) => {
        if (newTheme === 'dark') {
          document.body.setAttribute('arco-theme', 'dark');
          // state.theme = newTheme;
        } else {
          document.body.removeAttribute('arco-theme');
          // state.theme = newTheme;
        }
        store.dispatch(ActionsType.SET_MODE, newTheme);
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
        await store.dispatch(ActionsType.LOGOUT);
      };

      return {
        ...toRefs(state),
        changeTheme,
        setLang,
        toggleFullScreen,
        logout,
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
