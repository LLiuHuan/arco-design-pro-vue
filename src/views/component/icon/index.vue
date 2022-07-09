<template>
  <div>
    <a-card title="Icon组件示例" class="shadow-sm rounded-16px">
      <div class="grid grid-cols-10">
        <template v-for="item in icons" :key="item">
          <div class="mt-5px flex-x-center">
            <Icon :icon="item" class="text-30px" />
          </div>
        </template>
      </div>
      <div class="mt-50px">
        <h1 class="mb-20px text-18px font-500">Icon图标选择器</h1>
        <!--        <icon-select v-model:value="selectValue" :icons="icons" />-->
      </div>
      <template #actions>
        <web-site-link label="iconify地址：" link="https://icones.js.org/" class="mt-10px" />
      </template>
    </a-card>

    <a-card title="自定义Icon" class="mt-10px shadow-sm rounded-16px">
      <div class="pb-12px text-16px">
        在src/assets/svg文件夹下的svg文件，通过在template里面以 icon-custom-{文件名} 直接渲染
      </div>
      <div class="grid grid-cols-10">
        <div class="mt-5px flex-x-center">
          <icon-custom-logo class="text-40px text-success" />
        </div>
      </div>
      <div class="py-12px text-16px"
        >通过SvgIcon组件动态渲染, 菜单通过meta的customIcon属性渲染自定义图标</div
      >
      <div class="grid grid-cols-10">
        <div v-for="(item, index) in customIcons" :key="index" class="mt-5px flex-x-center">
          <svg-icon :icon="item" class="text-30px text-primary" />
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import { Icon } from '@iconify/vue';
  import { icons } from './icons';

  const customIcons = ['logo', 'activity', 'at-sign', 'cast', 'chrome', 'copy', 'wind'];
</script>

<style lang="less" scoped></style>
