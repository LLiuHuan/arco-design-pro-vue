<template>
  <div>
    <a-card :bordered="false" class="rounded-16px shadow-sm">
      <div class="flex-y-center justify-between">
        <div class="flex-y-center">
          <!--        <icon-custom-avatar class="text-70px" />-->
          <a-avatar :size="60">
            <img src="@/assets/images/schoolboy.png" alt="" />
          </a-avatar>
          <div class="pl-12px">
            <h3 class="text-18px font-semibold"
              >{{ $t('dashboard.workbench.good-morning') }}，{{ auth.userInfo.userName }},
              {{ $t('dashboard.workbench.start-day') }}</h3
            >
            <p class="leading-30px text-[#999]">{{ $t('dashboard.workbench.weather') }}</p>
          </div>
        </div>
        <a-space :size="24" :wrap="false">
          <a-statistic
            v-for="item in statisticData"
            :key="item.id"
            class="whitespace-nowrap"
            :title="$t(item.title)"
            :value="item.value"
          />
        </a-space>
      </div>
    </a-card>

    <a-row :gutter="10">
      <a-col :span="18">
        <a-card
          :title="$t('dashboard.workbench.project')"
          :bordered="false"
          class="rounded-16px shadow-sm mt-15px"
        >
          <a-card-grid
            v-for="(item, index) in technology"
            :key="index"
            hoverable
            :style="{ width: '33.3%' }"
          >
            <a-card :bordered="false">
              <TechnologyCard v-bind="item" />
            </a-card>
          </a-card-grid>
        </a-card>

        <a-card
          :title="$t('dashboard.workbench.dynamic')"
          :bordered="false"
          class="rounded-16px shadow-sm mt-15px"
        >
          <a-list :bordered="false">
            <a-list-item v-for="(item, index) in dynamic" :key="index">
              <a-list-item-meta :title="item.title" :description="item.description">
                <template #avatar>
                  <a-avatar shape="square">
                    <img alt="avatar" :src="item.logo" />
                  </a-avatar>
                </template>
              </a-list-item-meta>
            </a-list-item>
          </a-list>
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card class="rounded-16px shadow-sm mt-15px" :title="$t('dashboard.workbench.progress')">
          <a-timeline-item v-for="item in dataTimeline" :key="item.messageUrl" :label="item.date">
            <span class="message w-full">{{ item.message }}</span>
          </a-timeline-item>

          <a-empty v-if="dataTimeline.length === 0" />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { format } from 'date-fns';
  import { useAuthStore } from '@/store';
  import { getCommit } from '@/api/system/github';
  import { TechnologyCard } from './component';

  interface StatisticData {
    id: number;
    title: string;
    value: number;
  }

  interface Technology {
    id: number;
    name: string;
    description: string;
    author: string;
    site: string;
    icon: string;
    iconColor?: string;
  }

  interface dataTimeItem {
    date: string;
    message: string;
    messageUrl: string;
  }

  interface Dynamic {
    title: string;
    description: string;
    logo: string;
  }

  const auth = useAuthStore();

  const statisticData: StatisticData[] = [
    {
      id: 0,
      title: 'dashboard.workbench.items',
      value: 25,
    },
    {
      id: 1,
      title: 'dashboard.workbench.abeyance',
      value: 4,
    },
    {
      id: 2,
      title: 'dashboard.workbench.news',
      value: 12,
    },
  ];

  const technology: Technology[] = [
    {
      id: 0,
      name: 'Golang',
      description: 'Google开发的一种编程语言',
      author: 'Google',
      site: 'https://github.com/',
      icon: 'fa6-brands:golang',
    },
    {
      id: 1,
      name: 'Vue',
      description: '一套用于构建用户界面的渐进式框架',
      author: '尤雨溪',
      site: 'https://v3.cn.vuejs.org/',
      icon: 'vscode-icons:file-type-vue',
    },
    {
      id: 2,
      name: 'JetBrains',
      description:
        '一家致力于将专业的软件开发变成生产力更高、更愉悦的体验的公司。致谢其对教育及开源项目的支持。',
      author: 'JetBrains',
      site: 'https://www.jetbrains.com/',
      icon: 'logos:jetbrains',
    },
    {
      id: 3,
      name: 'Vite',
      description: '下一代前端开发与构建工具',
      author: '尤雨溪',
      site: 'https://vitejs.cn/',
      icon: 'vscode-icons:file-type-vite',
    },
    {
      id: 4,
      name: 'UnoCSS',
      description: '下一代实用优先的CSS框架',
      author: 'Anthony Fu',
      site: 'https://uno.antfu.me/?s=',
      icon: 'logos:unocss',
      iconColor: '#48b0f1',
    },
    {
      id: 5,
      name: 'Pinia',
      description: 'vue状态管理框架，支持vue2、vue3',
      author: 'Posva',
      site: 'https://pinia.esm.dev/',
      icon: 'mdi:fruit-pineapple',
      iconColor: '#fecf48',
    },
  ];

  const dataTimeline = ref<dataTimeItem[]>([]);

  const dynamic = ref<Dynamic[]>([
    {
      title: '刚才把工作台页面随便写了以下，勉强能看了。',
      description: '2022-07:24 11:11:11',
      logo: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      title: '刚才把工作台页面随便写了以下，勉强能看了。',
      description: '2022-07:24 11:11:11',
      logo: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      title: '刚才把工作台页面随便写了以下，勉强能看了。',
      description: '2022-07:24 11:11:11',
      logo: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      title: '刚才把工作台页面随便写了以下，勉强能看了。',
      description: '2022-07:24 11:11:11',
      logo: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
    {
      title: '刚才把工作台页面随便写了以下，勉强能看了。',
      description: '2022-07:24 11:11:11',
      logo: 'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp',
    },
  ]);

  const getGithubCommit = () => {
    getCommit(0).then(({ data }) => {
      data.forEach(
        (
          element: {
            commit: { message: any; author: { date: string | number | Date; name: any } };
            html_url: any;
          },
          index: number
        ) => {
          if (element.commit.message && index < 10) {
            dataTimeline.value.push({
              date: format(new Date(element.commit.author.date), 'yyyy-MM-dd'),
              message: element.commit.message,
              messageUrl: element.html_url,
            });
          }
        }
      );
    });
  };

  getGithubCommit();
</script>

<style lang="less" scoped>
  .message {
    line-height: 20px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  :deep(.arco-timeline-item-content) {
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
