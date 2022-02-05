<template>
  <div class="body">
    <!-- partial:index.partial.html -->
    <div ref="container" class="container">
      <!-- Sign Up -->
      <div class="container__form container--signup">
        <form ref="fistForm" action="#" class="form" id="form1">
          <h2 class="form__title">Sign Up</h2>
          <input type="text" placeholder="User" class="input" />
          <input type="email" placeholder="Email" class="input" />
          <input type="password" placeholder="Password" class="input" />
          <button class="btn">Sign Up</button>
        </form>
      </div>

      <!-- Sign In -->
      <div class="container__form container--signin">
        <a-form
          ref="secondForm"
          class="form"
          id="form2"
          :model="form"
          size="large"
          :wrapper-col-style="{ flex: 'auto' }"
        >
          <a-form-item field="username" hide-label>
            <a-input v-model="form.username" placeholder="请输入用户名" />
          </a-form-item>
          <a-form-item field="password" hide-label>
            <a-input-password v-model="form.password" placeholder="请输入密码" allow-clear />
          </a-form-item>
          <a-row>
            <a-col :span="14">
              <a-form-item field="captcha" hide-label>
                <a-input v-model="form.captcha" placeholder="请输入验证码" />
              </a-form-item>
            </a-col>
            <a-col :span="10">
              <a-form-item field="captcha" hide-label>
                <img
                  class="w-full"
                  @click="resetCaptcha"
                  :src="form.picPath"
                  style="padding-left: 5px"
                />
              </a-form-item>
            </a-col>
          </a-row>
          <a-form-item>
            <a-button @click="handleSubmit">Submit</a-button>
          </a-form-item>
        </a-form>
      </div>

      <!-- Overlay -->
      <div class="container__overlay">
        <div class="overlay">
          <div class="overlay__panel overlay--left">
            <button ref="signInBtn" class="btn" id="signIn" @click="active('remove')"
              >Sign In</button
            >
          </div>
          <div class="overlay__panel overlay--right">
            <button ref="signUpBtn" class="btn" id="signUp" @click="active('add')">Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!--  <div>-->
  <!--    <a-form :components="form" :style="{ width: '600px' }">-->
  <!--      <a-form-item field="username" label="用户名">-->
  <!--        <a-input v-components="form.username" placeholder="" />-->
  <!--        <template #help>-->
  <!--          <div>help message</div>-->
  <!--        </template>-->
  <!--      </a-form-item>-->
  <!--      <a-form-item field="password" label="密码">-->
  <!--        <a-input v-components="form.password" placeholder="" />-->
  <!--      </a-form-item>-->
  <!--      <a-form-item field="captcha">-->
  <!--        <img @click="resetCaptcha" :src="form.picPath" />-->
  <!--      </a-form-item>-->
  <!--      <a-form-item field="captcha" label="验证码">-->
  <!--        <a-input v-components="form.captcha" placeholder="" />-->
  <!--      </a-form-item>-->
  <!--      <a-form-item>-->
  <!--        <a-button @click="handleSubmit">Submit</a-button>-->
  <!--      </a-form-item>-->
  <!--      {{ form }}-->
  <!--    </a-form>-->
  <!--  </div>-->
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Captcha } from '@/api/base/login';
  import { Message } from '@arco-design/web-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/users';
  import { generate, getRgbStr } from '@arco-design/color';

  export default defineComponent({
    name: 'Login',
    setup() {
      const userStore = useUserStore();

      const formInline = reactive({
        form: {
          username: 'admin',
          password: '123456',
          captcha: '',
          captchaId: '',
          picPath: '',
          captchaLength: 0,
          isRead: false,
        },
      });
      const router = useRouter();
      const route = useRoute();

      const signInBtn = ref();
      const signUpBtn = ref();
      const fistForm = ref();
      const secondForm = ref();
      const container = ref();

      const resetCaptcha = () => {
        Captcha().then((res: any) => {
          const { captchaId, picPath, captchaLength } = res;

          formInline.form.captchaId = captchaId;
          formInline.form.captchaLength = captchaLength;
          formInline.form.picPath = picPath;
          formInline.form.captcha = '';
        });
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        Message.loading('登陆中...');
        const flag = await userStore.login(formInline.form);
        if (!flag) {
          resetCaptcha();
        } else {
          Message.clear();

          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          Message.success('登录成功！');
          router.replace(toPath).then((_) => {
            if (route.name == 'login') {
              router.replace('/');
            } else {
              // 设置登陆后默认的样式
              const theme = userStore.getModel || 'dark';
              // 设置为暗黑主题
              document.body.setAttribute('arco-theme', theme === 'dark' ? 'dark' : 'light');

              // 设置主题色
              for (let i = 1; i < 10; i++) {
                document.body.style.setProperty(
                  `--arcoblue-${i}`,
                  getRgbStr(
                    generate(userStore.getBaseColor, {
                      index: i,
                      dark: userStore.getModel === 'dark',
                    })
                  )
                );
              }
            }
          });
        }
      };

      const active = (type: string) => {
        type == 'remove'
          ? container.value.classList.remove('right-panel-active')
          : container.value.classList.add('right-panel-active');
      };

      onBeforeMount(() => {
        resetCaptcha();
      });
      return {
        ...toRefs(formInline),
        resetCaptcha,
        handleSubmit,

        signInBtn,
        signUpBtn,
        fistForm,
        secondForm,
        container,

        active,
      };
    },
  });
</script>

<style lang="less" scoped>
  .body {
    align-items: center;
    background: var(--color-bg-2) url('src/assets/login_bg.jpg') no-repeat fixed center;
    background-size: cover;
    display: grid;
    height: 100vh;
    place-items: center;

    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell,
      'Open Sans', 'Helvetica Neue', sans-serif;
  }

  .form__title {
    font-weight: 300;
    margin: 0 0 1.25rem;
  }

  .link {
    color: #333;
    font-size: 0.9rem;
    margin: 1.5rem 0;
    text-decoration: none;
  }

  .container {
    background-color: var(--color-bg-2);
    border-radius: 0.7rem;
    box-shadow: 0 0.9rem 1.7rem rgba(0, 0, 0, 0.25), 0 0.7rem 0.7rem rgba(0, 0, 0, 0.22);
    height: 420px;
    max-width: 758px;
    overflow: hidden;
    position: relative;
    width: 100%;
  }

  .container__form {
    height: 100%;
    position: absolute;
    top: 0;
    transition: all 0.6s ease-in-out;
  }

  .container--signin {
    left: 0;
    width: 50%;
    z-index: 2;
  }

  .container.right-panel-active .container--signin {
    transform: translateX(100%);
  }

  .container--signup {
    left: 0;
    opacity: 0;
    width: 50%;
    z-index: 1;
  }

  .container.right-panel-active .container--signup {
    -webkit-animation: show 0.6s;
    animation: show 0.6s;
    opacity: 1;
    transform: translateX(100%);
    z-index: 5;
  }

  .container__overlay {
    height: 100%;
    left: 50%;
    overflow: hidden;
    position: absolute;
    top: 0;
    transition: transform 0.6s ease-in-out;
    width: 50%;
    z-index: 100;
  }

  .container.right-panel-active .container__overlay {
    transform: translateX(-100%);
  }

  .overlay {
    background: #008997 url('src/assets/login_bg.jpg') no-repeat fixed center;
    background-size: cover;
    height: 100%;
    left: -100%;
    position: relative;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 200%;
  }

  .container.right-panel-active .overlay {
    transform: translateX(50%);
  }

  .overlay__panel {
    align-items: center;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: center;
    position: absolute;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
    width: 50%;
  }

  .overlay--left {
    transform: translateX(-20%);
  }

  .container.right-panel-active .overlay--left {
    transform: translateX(0);
  }

  .overlay--right {
    right: 0;
    transform: translateX(0);
  }

  .container.right-panel-active .overlay--right {
    transform: translateX(20%);
  }

  .btn {
    background-color: #0367a6;
    background-image: linear-gradient(90deg, #0367a6 0%, #008997 74%);
    border-radius: 20px;
    border: 1px solid #0367a6;
    color: #fff;
    cursor: pointer;
    font-size: 0.8rem;
    font-weight: bold;
    letter-spacing: 0.1rem;
    padding: 0.9rem 4rem;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
  }

  .form > .btn {
    margin-top: 1.5rem;
  }

  .btn:active {
    transform: scale(0.95);
  }

  .btn:focus {
    outline: none;
  }

  .form {
    background-color: var(--color-bg-2);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 3rem;
    height: 100%;
    text-align: center;
    width: auto;
  }

  .input {
    background-color: var(--color-bg-2);
    border: none;
    padding: 0.9rem 0.9rem;
    margin: 0.5rem 0;
    width: 100%;
  }

  @-webkit-keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }

  @keyframes show {
    0%,
    49.99% {
      opacity: 0;
      z-index: 1;
    }

    50%,
    100% {
      opacity: 1;
      z-index: 5;
    }
  }
</style>
