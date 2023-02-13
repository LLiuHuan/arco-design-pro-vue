<!--<template>-->
<!--  <div class="flex justify-center items-center">-->
<!--    <a-button type="primary" @click="githubLogin">Github登录</a-button>-->

<!--    {{ route.query.code }}-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts" setup>-->
<!--  // f44968e19a26d4044173dec18803b5e0e45ccff7-->

<!--  // client id: 513f24d4d31cdc73f2c8-->
<!--  // client secrets: c4d176cfebaa2c76529f70ab67f6d2b35a5a2115-->

<!--  import { useRoute } from 'vue-router';-->
<!--  import { getAccessToken } from '@/api/plugin/github';-->
<!--  import { Github } from './config';-->

<!--  const route = useRoute();-->

<!--  getAccessToken(Github.access_token_uri, {-->
<!--    client_id: Github.client_id,-->
<!--    client_secret: Github.client_secret,-->
<!--    code: route.query.code,-->
<!--  }).then((res) => {-->
<!--    console.log(res);-->
<!--  });-->

<!--  const githubLogin = () => {-->
<!--    const config = Github;-->
<!--    window.localStorage.preventHref = window.location.href;-->
<!--    // window.location.href = 'https://github.com/login/oauth/authorize?client_id=***&redirect_uri=http://biaochenxuying.cn/'-->
<!--    window.location.href = `${config.other_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`;-->

<!--    console.log(-->
<!--      `${config.other_uri}?client_id=${config.client_id}&redirect_uri=${config.redirect_uri}`-->
<!--    );-->
<!--    // window.open(`${config.other_uri}?client_id=${config.client_id}`);-->
<!--  };-->
<!--</script>-->

<!--<style lang="less" scoped></style>-->

<template>
  <div> 第三方登录 </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
