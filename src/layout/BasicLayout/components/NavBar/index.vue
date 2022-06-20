<!--<template>-->
<!--  <div class="navbar">-->
<!--    <ul class="left">-->
<!--      <li>-->
<!--        <Logo />-->
<!--      </li>-->
<!--      <li v-if="headerSetting.isReload">-->
<!--        &lt;!&ndash; 刷新 &ndash;&gt;-->
<!--        <div>-->
<!--          <a-tooltip content="刷新">-->
<!--            <a-button @click="reloadPage" class="p-0 w-8 h-8" type="text" style="font-size: 20px">-->
<!--              <icon-refresh />-->
<!--            </a-button>-->
<!--          </a-tooltip>-->
<!--        </div>-->
<!--      </li>-->
<!--      <li v-if="crumbsSetting.show">-->
<!--        &lt;!&ndash; 面包屑 &ndash;&gt;-->
<!--        <a-breadcrumb>-->
<!--          <template v-for="(routeItem, index) in breadcrumbList" :key="index">-->
<!--            <a-breadcrumb-item>-->
<!--              <a-dropdown v-if="routeItem.children.length" @select="dropdownSelect">-->
<!--                <template #content>-->
<!--                  <a-doption-->
<!--                    v-for="(item, itemIndex) in routeItem.children"-->
<!--                    :value="item"-->
<!--                    :key="itemIndex"-->
<!--                  >-->
<!--                    {{-->
<!--                      item.meta.title.indexOf('menu.') !== -1-->
<!--                        ? $t(item.meta.title)-->
<!--                        : item.meta.title-->
<!--                    }}-->
<!--                  </a-doption>-->
<!--                </template>-->
<!--                <span class="link-text">-->
<!--                  <component-->
<!--                    v-if="crumbsSetting.showIcon && routeItem.meta.icon"-->
<!--                    :is="routeItem.meta.icon"-->
<!--                  />-->
<!--                  {{-->
<!--                    routeItem.meta.title.indexOf('menu.') !== -1-->
<!--                      ? $t(routeItem.meta.title)-->
<!--                      : routeItem.meta.title-->
<!--                  }}-->
<!--                </span>-->
<!--              </a-dropdown>-->
<!--              <span class="link-text" v-else>-->
<!--                <component-->
<!--                  v-if="crumbsSetting.showIcon && routeItem.meta.icon"-->
<!--                  :is="routeItem.meta.icon"-->
<!--                />-->
<!--                {{-->
<!--                  routeItem.meta.title.indexOf('menu.') !== -1-->
<!--                    ? $t(routeItem.meta.title)-->
<!--                    : routeItem.meta.title-->
<!--                }}-->
<!--              </span>-->
<!--            </a-breadcrumb-item>-->
<!--          </template>-->
<!--        </a-breadcrumb>-->
<!--      </li>-->
<!--    </ul>-->
<!--    <ul class="right">-->
<!--      <li>-->
<!--        <a target="_blank" :href="docs">-->
<!--          <IconGithub />-->
<!--        </a>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-tooltip :content="language === 'en-US' ? '点击切换为中文' : '点击切换为英文'">-->
<!--          <a-button-->
<!--            @click="setLang(language === 'en-US' ? 'zh-CN' : 'en-US')"-->
<!--            class="p-0 w-8 h-8"-->
<!--            type="text"-->
<!--            style="font-size: 20px"-->
<!--          >-->
<!--            <icon-chinese-fill v-if="language === 'en-US'" />-->
<!--            <icon-english-fill v-else />-->
<!--          </a-button>-->
<!--        </a-tooltip>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">-->
<!--          <a-button-->
<!--            @click="changeTheme(theme === 'light' ? 'dark' : 'light')"-->
<!--            class="p-0 w-8 h-8"-->
<!--            type="text"-->
<!--            style="font-size: 20px"-->
<!--          >-->
<!--            <icon-moon-fill v-if="theme === 'light'" />-->
<!--            <icon-sun-fill v-else />-->
<!--          </a-button>-->
<!--        </a-tooltip>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-tooltip content="点击切换为全屏模式">-->
<!--          <a-button-->
<!--            @click="toggleFullScreen"-->
<!--            class="p-0 w-8 h-8"-->
<!--            type="text"-->
<!--            style="font-size: 20px"-->
<!--          >-->
<!--            <icon-fullscreen v-if="!fullscreen" />-->
<!--            <icon-fullscreen-exit v-else />-->
<!--          </a-button>-->
<!--        </a-tooltip>-->
<!--      </li>-->
<!--      <li>-->
<!--        <a-avatar class="mr-2" :size="24" :style="{ backgroundColor: '#14a9f8', marginRight: 8 }"-->
<!--          >{{ userInfo.nickName }}-->
<!--        </a-avatar>-->
<!--        <a-dropdown>-->
<!--          <a-typography-text> {{ userInfo.nickName }}</a-typography-text>-->
<!--          <template #content>-->
<!--            <a-doption>-->
<!--              <span style="font-weight: 600">-->
<!--                当前角色：{{ userInfo?.authority?.authorityName }}-->
<!--              </span>-->
<!--            </a-doption>-->
<!--            <template v-if="userInfo.authorities.length > 0">-->
<!--              <a-doption-->
<!--                v-for="(item, index) in userInfo.authorities.filter(-->
<!--                  (i) => i.authorityId !== userInfo.authorityId-->
<!--                )"-->
<!--                :key="index"-->
<!--                @click="changeUserAuth(item.authorityId)"-->
<!--              >-->
<!--                <span> 切换为：{{ item.authorityName }} </span>-->
<!--              </a-doption>-->
<!--            </template>-->
<!--            <a-doption @click="logout">登出</a-doption>-->
<!--          </template>-->
<!--        </a-dropdown>-->
<!--      </li>-->
<!--    </ul>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { computed, defineComponent, onBeforeMount, reactive, ref, toRefs, unref } from 'vue';-->
<!--  import { useRoute, useRouter } from 'vue-router';-->
<!--  import { useI18n } from 'vue-i18n';-->
<!--  import { IconGithub } from '@arco-design/web-vue/es/icon';-->
<!--  import Logo from '@/layout/BasicLayout/components/Logo/index.vue';-->
<!--  import { storage } from '@/utils/storage/storage';-->
<!--  import { setUserAuthority } from '@/api/system/user';-->
<!--  import { emitter } from '@/utils/bus';-->
<!--  import { useUserStore } from '@/store/modules/user/users';-->
<!--  // import { UserInfoType } from '@/store/state-types';-->
<!--  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';-->
<!--  import { setBaseColor } from '@/utils/color';-->
<!--  import { UserInfo } from '@/api/system/user-types';-->

<!--  export default defineComponent({-->
<!--    name: 'NavBar',-->
<!--    components: {-->
<!--      Logo,-->

<!--      IconGithub,-->
<!--    },-->
<!--    setup() {-->
<!--      const userStore = useUserStore();-->
<!--      const router = useRouter();-->
<!--      const route = useRoute();-->
<!--      const { getHeaderSetting, getCrumbsSetting } = useProjectSetting();-->
<!--      const state = reactive({-->
<!--        options: [-->
<!--          { label: '中文', value: 'zh-CN' },-->
<!--          { label: 'English', value: 'en-US' },-->
<!--        ],-->
<!--        language: ref<string | undefined>(userStore.getLanguage),-->
<!--        theme: ref<string | undefined>(userStore.getModel), // light-->
<!--        docs: 'https://github.com/LLiuHuan',-->
<!--        fullscreen: false,-->
<!--        userInfo: {} as UserInfo,-->
<!--        headerSetting: getHeaderSetting,-->
<!--        crumbsSetting: getCrumbsSetting,-->
<!--      });-->

<!--      const generator: any = (routerMap) => {-->
<!--        return routerMap.map((item) => {-->
<!--          const currentMenu = {-->
<!--            ...item,-->
<!--            label: item.meta.title,-->
<!--            key: item.name,-->
<!--            disabled: item.path === '/',-->
<!--          };-->
<!--          // 是否有子菜单，并递归处理-->
<!--          if (item.children && item.children.length > 0) {-->
<!--            // Recursion-->
<!--            currentMenu.children = generator(item.children, currentMenu);-->
<!--          }-->
<!--          return currentMenu;-->
<!--        });-->
<!--      };-->

<!--      const breadcrumbList = computed(() => {-->
<!--        return generator(route.matched);-->
<!--      });-->

<!--      const dropdownSelect = (routeMap) => {-->
<!--        router.push({ path: routeMap.path });-->
<!--      };-->

<!--      // 使用i18n-->
<!--      const { locale } = useI18n({ useScope: 'global' });-->

<!--      locale.value = state.language ? state.language : 'zh-CN';-->

<!--      // 修改语言-->
<!--      const setLang = (value: string | undefined) => {-->
<!--        if (value) {-->
<!--          if (value == state.language) return;-->
<!--          locale.value = value;-->
<!--          state.language = value;-->
<!--          userStore.setLanguage(value);-->
<!--          storage.set('app-lang', value || 'zh-CN');-->
<!--          location.replace(location.href);-->
<!--        }-->
<!--      };-->

<!--      // 修改亮色/黑暗模式-->
<!--      const changeTheme = (newTheme: string) => {-->
<!--        if (newTheme === 'dark') {-->
<!--          document.body.setAttribute('arco-theme', 'dark');-->
<!--        } else {-->
<!--          document.body.removeAttribute('arco-theme');-->
<!--        }-->
<!--        if (newTheme == state.theme) return;-->
<!--        userStore.setMode(newTheme);-->
<!--        state.theme = newTheme;-->
<!--        setBaseColor(userStore.getBaseColor, newTheme);-->
<!--      };-->

<!--      // 全屏切换-->
<!--      const toggleFullScreen = () => {-->
<!--        if (!document.fullscreenElement) {-->
<!--          document.documentElement.requestFullscreen();-->
<!--        } else if (document.exitFullscreen) {-->
<!--          document.exitFullscreen();-->
<!--        }-->
<!--      };-->

<!--      // 切换全屏图标-->
<!--      const toggleFullscreenIcon = () => (state.fullscreen = document.fullscreenElement !== null);-->

<!--      // 监听全屏切换事件-->
<!--      document.addEventListener('fullscreenchange', toggleFullscreenIcon);-->

<!--      const logout = async () => {-->
<!--        await userStore.logout();-->
<!--      };-->

<!--      // 切换角色-->
<!--      const changeUserAuth = async (id) => {-->
<!--        await setUserAuthority({-->
<!--          authorityId: id,-->
<!--        }).then(() => {-->
<!--          emitter.emit('closeAllPage');-->

<!--          userStore.getUserInfo().then((data) => {-->
<!--            state.userInfo = data;-->
<!--            router.replace(data.authority.defaultRouter);-->
<!--            setTimeout(() => {-->
<!--              window.location.reload();-->
<!--            }, 100);-->
<!--          });-->
<!--        });-->
<!--      };-->

<!--      // 刷新页面-->
<!--      const reloadPage = () => {-->
<!--        router.push({-->
<!--          path: `/redirect${unref(route).fullPath}`,-->
<!--        });-->
<!--      };-->

<!--      onBeforeMount(() => {-->
<!--        userStore.getUserInfo().then((data) => {-->
<!--          state.userInfo = data;-->
<!--        });-->

<!--        changeTheme(state.theme as string);-->
<!--        setLang(state.language);-->
<!--      });-->

<!--      return {-->
<!--        ...toRefs(state),-->
<!--        changeTheme,-->
<!--        setLang,-->
<!--        toggleFullScreen,-->
<!--        logout,-->
<!--        changeUserAuth,-->
<!--        reloadPage,-->
<!--        breadcrumbList,-->
<!--        dropdownSelect,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style lang="less" scoped>-->
<!--  @import 'styles/index.module.less';-->

<!--  button {-->
<!--    padding: 0 !important;-->
<!--  }-->
<!--</style>-->
