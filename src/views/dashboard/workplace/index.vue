<template>
  <div class="container">
    <banner />
    <Chart v-if="!loading" :options="chartOption" :width="'400px'" :height="'400px'" />
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

    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
  import { defineComponent, onBeforeMount, reactive, ref, toRefs } from 'vue';
  import { Notification } from '@arco-design/web-vue';
  import Banner from '@/views/dashboard/workplace/banner.vue';
  import { useSettingStore } from '@/store/modules/settings';
  import useChartOption from '@/hooks/echart-option';

  const settingsStore = useSettingStore();
  const state = reactive({
    theme: ref(settingsStore.getTheme),
  });
  const openNotification = () => {
    Notification.info({ content: 'This is an info message!' });
  };
  const loading = ref(true);

  const { chartOption } = useChartOption(() => {
    const data = ref<number[][]>([[], []]);
    return {
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [150, 230, 224, 218, 135, 147, 260],
          type: 'line',
        },
      ],
    };
  });

  loading.value = false;

  onBeforeMount(() => {});
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
