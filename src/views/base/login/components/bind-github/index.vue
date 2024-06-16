<template>
  <ASpace direction="vertical" fill>
    <IconGithub
      class="!text-#888 hover:!text-[rgba(var(--primary-5))] cursor-pointer"
      size="120"
    />
  </ASpace>
</template>

<script lang="ts" setup>
  import { useRoute } from 'vue-router';
  import axios from 'axios';
  import { reactive } from 'vue';
  import { consoleError } from '@/utils/common';
  import { IconGithub } from '@arco-design/web-vue/es/icon';
  import { GITHUB, GITHUB_TOKEN_URL, GITHUB_USER_INFO_URL } from '../../enum';

  const state = reactive({
    access_token: '',
    user_info: '',
  });

  const route = useRoute();
  const http = axios.create({
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      'Accept': 'application/json',
    },
  });

  function fetchUser() {
    if (!state.access_token) {
      return;
    }
    const headers = {
      Authorization: `Bearer ${state.access_token}`,
    };

    http
      .get(GITHUB_USER_INFO_URL, { headers })
      .then((response) => {
        state.user_info = response.data;
      })
      .catch((err) => consoleError(err));
  }

  function fetchAccessToken() {
    const code = route.query?.code;
    if (!code) {
      return;
    }
    http
      .post(GITHUB_TOKEN_URL, {
        code,
        client_id: GITHUB.ClientId,
        client_secret: GITHUB.ClientSecret,
      })
      .then((res) => {
        if (res.status === 200) {
          state.access_token = res.data.access_token;
        }
      })
      .catch((err) => {
        consoleError(err);
      })
      .then(() => {
        fetchUser();
      });
  }

  fetchAccessToken();
</script>

<style lang="less" scoped></style>
