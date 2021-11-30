<template>
  <div class="container">
    <a-card :bordered="false" title="项目信息" class="mt-4 proCard" size="small">
      <a-row style="height: 500px">
        <a-col :span="12"> 介绍呀 </a-col>
        <a-col :span="12" style="height: 500px; overflow-y: auto">
          <a-timeline
            v-if="dataTimeline.length !== 0"
            :reverse="false"
            style="white-space: pre-wrap; word-break: break-all"
            mode="alternate"
          >
            <a-timeline-item
              v-for="dateTime in dataTimeline"
              :label="dateTime.date"
              :key="dateTime"
              >{{ dateTime.message }}</a-timeline-item
            >
            <a-button type="text" @click="getGithubCommit">Load more</a-button>
          </a-timeline>
          <a-empty v-else />
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" title="开发环境依赖" class="mt-4 proCard" size="small">
      <a-descriptions :data="devSchema" :column="2" bordered />
    </a-card>

    <a-card :bordered="false" title="生产环境依赖" class="mt-4 proCard" size="small">
      <a-descriptions :data="schema" :column="2" bordered />
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, toRefs } from 'vue';
  import { getCommit } from '@/api/github/github';
  import { format } from 'date-fns';
  export default defineComponent({
    name: 'About',
    setup() {
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

      const { pkg } = __APP_INFO__;
      const { dependencies, devDependencies } = pkg;

      Object.keys(dependencies).forEach((key) => {
        state.schema.push({ value: dependencies[key], label: key });
      });

      Object.keys(devDependencies).forEach((key) => {
        state.devSchema.push({ value: devDependencies[key], label: key });
      });

      const getGithubCommit = () => {
        state.page += 1;
        getCommit(state.page).then(({ data }) => {
          data.forEach((element) => {
            if (element.commit.message) {
              state.dataTimeline.push({
                date: format(new Date(element.commit.author.date), 'yyyy-MM-dd'),
                userName: element.commit.author.name,
                showDayAndMonth: true,
                message: element.commit.message,
                messageUrl: element.html_url,
              });
            }
          });
        });
      };

      onMounted(() => {
        getGithubCommit();
      });

      return {
        ...toRefs(state),
        getGithubCommit,
      };
    },
  });
</script>

<style lang="less" scoped>
  .container {
    background-color: var(--color-fill-1);
    max-width: 100%;
    margin: 5px;
  }
</style>
