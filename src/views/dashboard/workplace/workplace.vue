<template>
  <h1>1234</h1>
  <div class="dark">
    <span class="cursor-pointer p-1 text-white dark:text-white container1">2345</span>
  </div>
  <a-button @click="openNotification">Top Right Message</a-button>
  <span class="cursor-pointer">{{ $t('menu.lang') }}</span>

  <div class="text-red-1 bg-arcoblue-6 border-arco-border-1 border-solid">
    Should Fill Something Here
  </div>
  <div class="p-20"> </div>
  <a-button type="outline">Outline</a-button>
  {{ theme }}
</template>

<script lang="ts">
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Notification } from '@arco-design/web-vue';
  import { useStore } from 'vuex';
  export default defineComponent({
    name: 'WorkPlace',
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
