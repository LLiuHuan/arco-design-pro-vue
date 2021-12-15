<template>
  <div>
    <a-form :model="form" :style="{ width: '600px' }">
      <a-form-item field="username" label="用户名">
        <a-input v-model="form.username" placeholder="" />
        <template #help>
          <div>help message</div>
        </template>
      </a-form-item>
      <a-form-item field="password" label="密码">
        <a-input v-model="form.password" placeholder="" />
      </a-form-item>
      <a-form-item field="captcha">
        <img @click="resetCaptcha" :src="form.picPath" />
      </a-form-item>
      <a-form-item field="captcha" label="验证码">
        <a-input v-model="form.captcha" placeholder="" />
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSubmit">Submit</a-button>
      </a-form-item>
      {{ form }}
    </a-form>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, toRefs } from 'vue';
  import { Captcha } from '@/api/base/login';
  import { Message } from '@arco-design/web-vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useStore } from 'vuex';
  import { ActionsType } from '@/store/modules/user/actions';
  export default defineComponent({
    name: 'Login',
    setup() {
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
      const store = useStore();

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
        const flag = await store.dispatch(ActionsType.LOGIN, formInline.form);
        if (!flag) {
          resetCaptcha();
        } else {
          Message.clear();

          const toPath = decodeURIComponent((route.query?.redirect || '/') as string);
          Message.success('登录成功！');
          router.replace(toPath).then((_) => {
            if (route.name == 'login') {
              router.replace('/');
            }
          });
        }
      };

      onBeforeMount(() => {
        resetCaptcha();
      });
      return {
        ...toRefs(formInline),
        resetCaptcha,
        handleSubmit,
      };
    },
  });
</script>

<style scoped></style>
