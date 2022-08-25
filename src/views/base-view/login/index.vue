<template>
  <div class="login-container">
    <div class="logo">
      <img
        alt="logo"
        src="//p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba5317c0c20ce20e64fac803d52bc.svg~tplv-49unhts6dw-image.image"
      />
      <div class="logo-text">{{ title }}</div>
    </div>
    <LoginBanner />
    <div class="content">
      <dark-mode-switch
        :dark="theme.darkMode"
        class="absolute left-48px top-24px z-3 text-20px"
        @update:dark="theme.setDarkMode"
      />
      <div class="content-inner">
        <div class="pt-24px">
          <transition name="fade-slide" mode="out-in" appear>
            <component :is="activeModule.component" />
          </transition>
        </div>
      </div>
      <div class="footer">
        <!--        <Footer />-->
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import type { Component } from 'vue';
  import { computed } from 'vue';
  import { EnumLoginModule } from '@/enums';
  import { useThemeStore } from '@/store';
  import { useAppInfo } from '@/composables';
  // import { getColorPalette, mixColor } from '@/utils';
  // import Footer from '@/components/footer/index.vue';
  import { PwdLogin } from './components';
  import LoginBanner from './components/banner.vue';

  interface Props {
    /** 登录模块分类 */
    module: EnumType.LoginModuleKey;
  }

  interface LoginModule {
    key: EnumType.LoginModuleKey;
    label: EnumLoginModule;
    component: Component;
  }

  const props = defineProps<Props>();

  const theme = useThemeStore();
  const { title } = useAppInfo();
  const modules: LoginModule[] = [
    { key: 'pwd-login', label: EnumLoginModule['pwd-login'], component: PwdLogin },
    // { key: 'code-login', label: EnumLoginModule['code-login'], component: CodeLogin },
    // { key: 'register', label: EnumLoginModule.register, component: Register },
    // { key: 'reset-pwd', label: EnumLoginModule['reset-pwd'], component: ResetPwd },
    // { key: 'bind-wechat', label: EnumLoginModule['bind-wechat'], component: BindWechat },
  ];

  const activeModule = computed(() => {
    const active: LoginModule = { ...modules[0] };
    const findItem = modules.find((item) => item.key === props.module);
    if (findItem) {
      Object.assign(active, findItem);
    }
    return active;
  });

  // const bgThemeColor = computed(() =>
  //   theme.darkMode ? getColorPalette(theme.themeColor, 7) : theme.themeColor
  // );
  //
  // const bgColor = computed(() => {
  //   const COLOR_WHITE = '#ffffff';
  //   const ratio = theme.darkMode ? 0.5 : 0.2;
  //   return mixColor(COLOR_WHITE, theme.themeColor, ratio);
  // });
</script>

<style lang="less" scoped>
  .login-container {
    display: flex;
    height: 100vh;

    .banner {
      width: 550px;
      background: linear-gradient(163.85deg, #1d2129 0%, #00308f 100%);
    }

    .content {
      position: relative;
      display: flex;
      flex: 1;
      align-items: center;
      justify-content: center;
      padding-bottom: 40px;
    }

    .footer {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
    }
  }

  .logo {
    position: fixed;
    top: 24px;
    left: 22px;
    z-index: 1;
    display: inline-flex;
    align-items: center;

    &-text {
      margin-right: 4px;
      margin-left: 4px;
      color: var(--color-fill-1);
      font-size: 20px;
    }
  }
</style>

<style lang="less" scoped>
  // responsive
  @media (max-width: @screen-lg) {
    .login-container {
      .banner {
        width: 25%;
      }
    }
  }
</style>
