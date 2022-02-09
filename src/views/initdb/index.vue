<template>
  <a-spin class="loading" tip="正在初始化数据库，请稍候" :loading="loading">
    <div class="init_page">
      <div class="init_page_panle">
        <div
          v-if="hello < 2"
          id="hello"
          :class="[hello < 1 ? 'slide-in-fwd-top' : 'slide-out-right']"
          class="hello"
        >
          <div>
            <div class="hello_title">ArcoDesignPro For Vue</div>
            <p class="in-two a-fadeinT">初始化须知</p>
            <p class="init_p">1.您需有用一定的VUE和GOLANG基础</p>
            <!--            <p class="init_p">2.请您确认是否已经阅读过官方文档</p>-->
            <p class="init_p">2.请您确认是否了解后续的配置流程</p>
            <!--            <p class="init_p">注：开发组不为文档中书写过的内容提供无偿服务</p>-->
            <p class="init_btn">
              <!--              <a-button type="primary" @click="goDoc"> 阅读文档 </a-button>-->
              <a-button type="primary" @click="showNext"> 我已确认 </a-button>
            </p>
          </div>
        </div>
        <div
          v-if="hello > 0"
          :class="[hello > 0 && !out ? 'slide-in-left' : '', out ? 'slide-out-right' : '']"
          class="form"
        >
          <a-form ref="formRef" :model="form" label-width="100px">
            <a-form-item label="数据库类型">
              <a-select v-model="form.dbType" placeholder="请选择" @change="changeDB">
                <a-option key="mysql" label="mysql" value="mysql" />
                <!--                <a-option key="pgsql" label="pgsql(测试版)" value="pgsql" />-->
              </a-select>
            </a-form-item>
            <a-form-item label="host">
              <a-input v-model="form.host" placeholder="请输入数据库链接" />
            </a-form-item>
            <a-form-item label="port">
              <a-input v-model="form.port" placeholder="请输入数据库端口" />
            </a-form-item>
            <a-form-item label="userName">
              <a-input v-model="form.userName" placeholder="请输入数据库用户名" />
            </a-form-item>
            <a-form-item label="password">
              <a-input v-model="form.password" placeholder="请输入数据库密码（没有则为空）" />
            </a-form-item>
            <a-form-item label="dbName">
              <a-input v-model="form.dbName" placeholder="请输入数据库名称" />
            </a-form-item>
            <a-form-item>
              <div style="text-align: right">
                <a-button type="primary" @click="onSubmit">立即初始化</a-button>
              </div>
            </a-form-item>
          </a-form>
        </div>
      </div>
    </div>
  </a-spin>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { initDB } from '@/api/initdb';
  import { reactive, ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { Message } from '@arco-design/web-vue';

  export default defineComponent({
    name: 'InitDB',
    setup() {
      const router = useRouter();
      const formRef = ref();

      const loading = ref(false);
      const hello = ref(0);
      const showNext = () => {
        hello.value = hello.value + 1;
      };

      const goDoc = () => {
        window.open('https://www.gin-vue-admin.com/docs/first_master#3-init');
      };

      const out = ref(false);

      const form = reactive({
        dbType: 'mysql',
        host: '127.0.0.1',
        port: '3306',
        userName: 'root',
        password: '',
        dbName: 'adp',
      });
      const changeDB = (val) => {
        switch (val) {
          case 'mysql':
            Object.assign(form, {
              dbType: 'mysql',
              host: '127.0.0.1',
              port: '3306',
              userName: 'root',
              password: '',
              dbName: 'adp',
            });
            break;
          case 'pgsql':
            Object.assign(form, {
              dbType: 'pgsql',
              host: '127.0.0.1',
              port: '5432',
              userName: 'postgres',
              password: '',
              dbName: 'adp',
            });
            break;
          default:
            Object.assign(form, {
              dbType: 'mysql',
              host: '127.0.0.1',
              port: '3306',
              userName: 'root',
              password: '',
              dbName: 'adp',
            });
        }
      };
      const onSubmit = async () => {
        loading.value = true;
        try {
          const res = await initDB(form);
          if (res.code === 0) {
            out.value = true;
            Message.success('初始化成功！');
            await router.push({ name: 'Login' });
          }
          loading.value = false;
        } catch (err) {
          loading.value = false;
        }
      };

      return {
        formRef,
        form,
        out,
        hello,
        showNext,
        goDoc,
        changeDB,
        onSubmit,
        loading,
      };
    },
  });
</script>

<style lang="less" scoped>
  .loading {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    display: block;
  }
  .init_page {
    margin: 0;
    padding: 0;
    background-image: url('./src/assets/login_bg.jpg');
    background-size: cover;
    width: 100%;
    height: 100%;
    position: relative;
    .init_page_panle {
      position: absolute;
      top: 20vh;
      left: 24vw;
      width: 52vw;
      height: 50vh;
      background-color: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(1px);
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      .hello {
        position: absolute;
        z-index: 2;
        text-align: center;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        .hello_title {
          font-size: 32px;
          line-height: 98px;
        }
        .in-two {
          font-size: 22px;
        }
        .init_p {
          margin-top: 20px;
          color: #777777;
        }
        .init_btn {
          margin-top: 20px;
        }
      }
      .form {
        position: absolute;
        z-index: 3;
        margin-top: 60px;
        width: 600px;
        height: auto;
        padding: 20px;
        border-radius: 6px;
      }
    }
  }

  .slide-in-fwd-top {
    -webkit-animation: slide-in-fwd-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-fwd-top 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  .slide-out-right {
    -webkit-animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
    animation: slide-out-right 0.5s cubic-bezier(0.55, 0.085, 0.68, 0.53) both;
  }
  .slide-in-left {
    -webkit-animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
    animation: slide-in-left 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  }
  @-webkit-keyframes slide-in-fwd-top {
    0% {
      -webkit-transform: translateZ(-1400px) translateY(-800px);
      transform: translateZ(-1400px) translateY(-800px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-fwd-top {
    0% {
      -webkit-transform: translateZ(-1400px) translateY(-800px);
      transform: translateZ(-1400px) translateY(-800px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateZ(0) translateY(0);
      transform: translateZ(0) translateY(0);
      opacity: 1;
    }
  }
  @-webkit-keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(2000px);
      transform: translateX(2000px);
      opacity: 0;
    }
  }
  @keyframes slide-out-right {
    0% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
    100% {
      -webkit-transform: translateX(2000px);
      transform: translateX(2000px);
      opacity: 0;
    }
  }
  @-webkit-keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-2000px);
      transform: translateX(-2000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @keyframes slide-in-left {
    0% {
      -webkit-transform: translateX(-2000px);
      transform: translateX(-2000px);
      opacity: 0;
    }
    100% {
      -webkit-transform: translateX(0);
      transform: translateX(0);
      opacity: 1;
    }
  }
  @media (max-width: 750px) {
    .form {
      width: 94vw !important;
      padding: 0;
    }
  }
</style>
