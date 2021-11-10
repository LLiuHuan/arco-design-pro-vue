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
        <a>文档中心</a>
      </li>
      <li>
        <a-select v-model:value="language" :bordered="false">
          <a-option v-for="opt in options" :key="opt.value" :value="opt.value">{{
            opt.label
          }}</a-option>
        </a-select>
      </li>
      <!--      <li>-->
      <!--        <Tooltip-->
      <!--          content={-->
      <!--          theme === 'light'-->
      <!--        ? locale['settings.navbar.theme.toDark']-->
      <!--        : locale['settings.navbar.theme.toLight']-->
      <!--        }-->
      <!--        >-->
      <!--        <Button-->
      <!--          type="text"-->
      <!--          icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}-->
      <!--        onClick={() =>-->
      <!--        dispatch({-->
      <!--        type: 'toggle-theme',-->
      <!--        payload: { theme: theme === 'light' ? 'dark' : 'light' },-->
      <!--        })-->
      <!--        }-->
      <!--        style={{ fontSize: 20 }}-->
      <!--        />-->
      <!--        </Tooltip>-->
      <!--      </li>-->
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
        language: 'zh-CN',
      });
      return {
        ...toRefs(state),
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
</style>
