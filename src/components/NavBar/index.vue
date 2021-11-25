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
        <a>{{ $t('navbar.docs') }}</a>
      </li>
      <li>
        <a-select v-model="language" @change="setLang(language)">
          <a-option v-for="opt in options" :key="opt.value" :value="opt.value">{{
            opt.label
          }}</a-option>
        </a-select>
      </li>
      <li>
        <a-tooltip :content="theme === 'light' ? '点击切换为暗黑模式' : '点击切换为亮色模式'">
          <a-button class="p-0 w-8 h-8" type="text" style="font-size: 20px">
            <icon-moon-fill v-if="theme === 'light'" />
            <icon-sun-fill v-else />
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
            <a-doption>登出</a-doption>
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
      <!--        <Menu onClickMenuItem={onMenuItemClick}>-->
      <!--          <Menu.Item key="logout">登出</Menu.Item>-->
      <!--        </Menu>-->
      <!--        }-->
      <!--        >-->
      <!--        <Typography.Text class={styles.username}>{userInfo.name}</Typography.Text>-->
      <!--        </Dropdown>-->
      <!--      </li>-->
    </ul>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import Logo from '@/components/Logo/index.vue';
  import MessageBox from '@/components/MessageBox/index.vue';
  import { useI18n } from 'vue-i18n';
  export default defineComponent({
    name: 'NavBar',
    components: {
      Logo,
      MessageBox,
    },
    setup() {
      const state = reactive({
        options: [
          { label: '中文', value: 'zh-CN' },
          { label: 'English', value: 'en-US' },
        ],
        language: localStorage.getItem('arco-lang'),
        theme: 'dark', // light
      });
      // 使用i18n
      const { locale } = useI18n();
      console.log(locale);

      // 修改语言
      const setLang = (value: string | null) => {
        if (value) {
          locale.value = value;
          localStorage.setItem('arco-lang', value);
        }
      };
      return {
        ...toRefs(state),

        setLang,
      };
    },
  });
</script>

<style lang="less" scoped>
  .navbar {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid var(--color-border);
    box-sizing: border-box;
    background-color: var(--color-bg-2);
    height: 100%;
  }

  .left {
    display: flex;
    align-items: center;
    padding-left: 20px;
  }

  .right {
    display: flex;
    list-style: none;
    padding-right: 20px;

    li {
      padding: 0 10px;
      display: flex;
      align-items: center;
    }

    a {
      text-decoration: none;
      color: var(--color-text-1);
    }
  }

  .username {
    cursor: pointer;
  }

  // 设置下拉无边框
  :deep(.arco-select-view.arco-select-view-single) {
    background-color: var(--color-fill-5);
    border: none !important;
  }
  :deep(.arco-select-view.arco-select-view-single:hover) {
    background-color: var(--color-fill-5);
    border-color: var(--color-fill-5);
    border: none !important;
  }
  :deep(.arco-select-view.arco-select-view-single .arco-select-view-suffix) {
    padding: 5px;
  }
</style>
