<template>
  <div class="container-view">
    <a-card :bordered="false" title="项目信息" class="proCard" size="small">
      <a-row style="height: 500px">
        <a-col :span="6">
          <div class="flex justify-center items-center flex-col h-400px">
            <img class="w-100px mb-15px" src="@/assets/images/logo.png" alt="Logo" />
            <div class="mb-15px text-center leading-24px">
              基于 Arco Design Vue 组件库的开箱即用的中后台前端解决方案。
            </div>
          </div>
        </a-col>
        <a-col :span="18" style="height: 500px; overflow-y: auto">
          <a-timeline
            v-if="state.dataTimeline.length !== 0"
            :reverse="false"
            style="white-space: pre-wrap; word-break: break-all"
            mode="alternate"
          >
            <a-timeline-item
              v-for="(dateTime, index) in state.dataTimeline"
              :label="dateTime.date"
              :key="index"
              >{{ dateTime.message }}
            </a-timeline-item>
            <a-button type="text" @click="getGithubCommit">Load more</a-button>
          </a-timeline>
          <a-empty v-else />
        </a-col>
      </a-row>
    </a-card>
    <proDependencies />

    <devDependencies />
  </div>
</template>

<script lang="ts" setup>
  import { onMounted, reactive, ref } from 'vue';
  import { format } from 'date-fns';
  import { getCommit } from '@/api/system/github';
  import { devDependencies, proDependencies } from './components';

  interface schemaItem {
    value: string;
    label: string;
  }

  interface dataTimeItem {
    date: string;
    userName: string;
    showDayAndMonth: boolean;
    message: string;
    messageUrl: string;
  }

  const state = reactive({
    schema: ref<schemaItem[]>([]),
    devSchema: ref<schemaItem[]>([]),
    dataTimeline: ref<dataTimeItem[]>([]),
    page: ref(0),
  });

  const getGithubCommit = () => {
    state.page += 1;
    getCommit(state.page).then(({ data }) => {
      data.forEach(
        (element: {
          commit: { message: any; author: { date: string | number | Date; name: any } };
          html_url: any;
        }) => {
          if (element.commit.message) {
            state.dataTimeline.push({
              date: format(new Date(element.commit.author.date), 'yyyy-MM-dd'),
              userName: element.commit.author.name,
              showDayAndMonth: true,
              message: element.commit.message,
              messageUrl: element.html_url,
            });
          }
        }
      );
    });
  };

  onMounted(() => {
    getGithubCommit();
  });
</script>

<style lang="less" scoped></style>
