<template>
  <div class="container">
    <banner />

    <h1>1234</h1>
    <div class="dark">
      <span class="cursor-pointer p-1 text-white dark:text-white container1">2345</span>
    </div>
    <a-button
      v-permission="{ action: ['RoleEnum.ADMIN, RoleEnum.NORMAL'], effect: 'disabled' }"
      @click="openNotification"
      >Top Right Message</a-button
    >
    <span class="cursor-pointer">{{ $t('menu.lang') }}</span>

    <div class="text-red-1 bg-arcoblue-6 border-arco-border-1 border-solid">
      Should Fill Something Here
    </div>
    <div class="p-20"> </div>
    <a-button v-permission="['aaa']" type="outline">Outline</a-button>
    {{ theme }}
  </div>
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Notification } from '@arco-design/web-vue';
  import { useStore } from 'vuex';
  import Banner from '@/views/dashboard/workplace/banner.vue';
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      Banner,
    },
    setup() {
      const store = useStore();
      const state = reactive({
        theme: ref(store.getters.getTheme),
      });
      const openNotification = () => {
        Notification.info({ content: 'This is an info message!' });
      };

      onBeforeMount(() => {});

      return {
        openNotification,
        ...toRefs(state),
      };
    },
  });
</script>

<!--<style>-->
<!--  .container1 {-->
<!--    color: rgb(var(&#45;&#45;red-1));-->
<!--    background-color: rgb(var(&#45;&#45;arcoblue-6));-->
<!--    border: 1px solid var(&#45;&#45;color-border-1);-->
<!--  }-->
<!--</style>-->

<style lang="less" scoped>
  .banner {
    background-color: var(--color-bg-2);
    padding: 20px;
  }

  .content {
    padding: 20px;
    display: flex;
  }

  .left {
    flex: 1;
  }

  .right {
    width: 280px;
    margin-left: 12px;
  }

  .panel {
    background-color: var(--color-bg-2);
    margin-bottom: 12px;
    border-radius: 2px;
  }
</style>
