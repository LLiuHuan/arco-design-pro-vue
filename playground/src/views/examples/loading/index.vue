<script lang="ts" setup>
import { Loading, Page, Spinner } from '@arco/common-ui';
import { IconifyIcon } from '@arco/icons';

import { Button, Card, Spin } from '@arco-design/web-vue';
import { refAutoReset } from '@vueuse/core';

const spinning = refAutoReset(false, 3000);
const loading = refAutoReset(false, 3000);

const spinningV = refAutoReset(false, 3000);
const loadingV = refAutoReset(false, 3000);
</script>
<template>
  <Page
    title="Arco Loading"
    description="加载中状态组件。这个组件可以为其它作为容器的组件添加一个加载中的遮罩层。使用它们时，容器需要relative定位。"
  >
    <Spin class="w-full" :loading="spinning" tip="加载中...">
      <Card title="Arco Spin">
        <template #actions>
          <div class="">这是Arco 组件库自带的Spin组件演示</div>
        </template>
        <Button type="primary" @click="spinning = true">显示Spin</Button>
      </Card>
    </Spin>

    <Card title="Arco Loading" v-loading="loadingV" class="mt-4">
      <template #extra>
        <Button type="primary" @click="loadingV = true">
          v-loading 指令
        </Button>
      </template>
      <template #actions>
        <div>
          Loading组件可以设置文字，并且也提供了icon插槽用于替换加载图标。
        </div>
      </template>
      <div class="flex gap-4">
        <div class="size-40">
          <Loading
            :spinning="loading"
            text="正在加载..."
            class="flex h-full w-full items-center justify-center"
          >
            <Button type="primary" @click="loading = true">默认动画</Button>
          </Loading>
        </div>
        <div class="size-40">
          <Loading
            :spinning="loading"
            class="flex h-full w-full items-center justify-center"
          >
            <Button type="primary" @click="loading = true">自定义动画1</Button>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:ring-resize"
                class="text-primary size-10"
              />
            </template>
          </Loading>
        </div>
        <div class="size-40">
          <Loading
            :spinning="loading"
            class="flex h-full w-full items-center justify-center"
          >
            <Button type="primary" @click="loading = true">自定义动画2</Button>
            <template #icon>
              <IconifyIcon
                icon="svg-spinners:bars-scale"
                class="text-primary size-10"
              />
            </template>
          </Loading>
        </div>
      </div>
    </Card>

    <Card
      title="Arco Spinner"
      v-spinning="spinningV"
      class="mt-4 overflow-hidden"
      :body-style="{
        position: 'relative',
        overflow: 'hidden',
      }"
    >
      <template #extra>
        <Button type="primary" @click="spinningV = true">
          v-spinning 指令
        </Button>
      </template>
      <template #actions>
        <div>Spinner组件是Loading组件的一个特例，只有一个固定的统一样式。</div>
      </template>
      <Spinner
        :spinning="spinning"
        class="flex size-40 items-center justify-center"
      >
        <Button type="primary" @click="spinning = true">显示Spinner</Button>
      </Spinner>
    </Card>
  </Page>
</template>
