<script setup lang="ts">
  import { ref } from 'vue';
  import { defHttp } from '@/utils/http';
  import { Message } from '@arco-design/web-vue';
  import ExceptionBase from '@/components/Exception/src/index.vue';
  import { SvgIcon } from '@/components/Icon';
  import { consoleLog } from '@/utils';
  import { useLocaleStore } from '@/store/modules/locale';
  import { i18n } from '@/locale';
  import { useLocale } from '@/locale/useLocale';

  defineProps<{ msg: string }>();

  const count = ref(0);

  const a1 = () => {
    defHttp
      .post({
        url: 'https://mock.apifox.com/m1/3402401-0-default/api/v1/login',
        params: {
          username: 'admin',
          password: 'admin',
        },
      })
      .then((res) => {
        consoleLog(res);
      });
  };
  const b1 = () => {
    defHttp
      .get({
        url: 'https://mock.apifox.com/m1/3402401-0-default/api/v1/getUserInfo',
      })
      .then((res) => {
        consoleLog(res);
      });
  };

  const c1 = () => {
    Message.success({
      content: '操作成功！',
      duration: 80000,
      // resetOnHover: true,
    });
  };

  const d1 = () => {
    const localeStore = useLocaleStore();

    if (localeStore.getLocale === 'zh-CN') {
      localeStore.setLocaleInfo({ locale: 'en-US' });
    } else {
      localeStore.setLocaleInfo({ locale: 'zh-CN' });
    }
  };

  const { changeLocale, getLocale } = useLocale();
</script>

<template>
  <a-layout style="height: 400px">
    <a-layout-header>Header</a-layout-header>
    <a-layout-content>
      <div>
        <h1>{{ msg }}</h1>

        <!--        <DarkMode-->
        <!--          style="color: var(&#45;&#45;color-text-1)"-->
        <!--          @update:dark="theme.toggleDarkMode()"-->
        <!--        ></DarkMode>-->

        <ExceptionBase type="404"></ExceptionBase>
        <!--        <SvgIcon name="no-permission"></SvgIcon>-->
        <SvgIcon size="100" icon="material-symbols:1k"></SvgIcon>

        <a-button
          @click="changeLocale(getLocale === 'zh-CN' ? 'en-US' : 'zh-CN')"
          >切换中英文</a-button
        >
        <a-pagination
          :total="50"
          :size="'mini'"
          show-total
          show-jumper
          show-page-size
        />

        <div class="card">
          <a-button @click="a1">a1</a-button>
          <a-button @click="b1">b1</a-button>
          <a-button @click="c1">c1</a-button>
          <a-button @click="count++">count is {{ count }}</a-button>
          <p>
            Edit
            <code>components/HelloWorld.vue</code> to test HMR
          </p>
        </div>

        <p>
          Check out
          <a
            href="https://vuejs.org/guide/quick-start.html#local"
            target="_blank"
            >create-vue</a
          >, the official Vue + Vite starter
        </p>
        <p>
          Install
          <a href="https://github.com/vuejs/language-tools" target="_blank"
            >Volar</a
          >
          in your IDE for a better DX
        </p>
        <p class="read-the-docs"
          >Click on the Vite and Vue logos to learn more</p
        >
      </div>
    </a-layout-content>
    <a-layout-footer>Footer</a-layout-footer>
  </a-layout>
</template>

<style scoped>
  .read-the-docs {
    color: #888;
  }
</style>
