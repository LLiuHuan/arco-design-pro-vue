<template>
  <div class="h-full">
    <a-card title="打印" class="shadow-sm rounded-16px">
      <a-button type="primary" class="mr-10px" @click="printTable">打印表格</a-button>
      <a-button type="primary" @click="printImage">打印图片</a-button>
      <template #actions>
        <web-site-link
          label="printJS："
          link="https://github.com/crabbly/Print.js"
          class="mt-10px"
        />
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import printJS from 'print-js';

  function printTable() {
    printJS({
      printable: [
        { 姓名: '小红', 年龄: '13', 备注: '小红小红小小红' },
        { 姓名: '小明', 年龄: '15', 备注: '小明小明小小明' },
        { 姓名: '小刚', 年龄: '18', 备注: '小刚小刚小小刚' },
      ],
      properties: ['姓名', '年龄', '备注'],
      type: 'json',
    });
  }
  function printImage() {
    printJS({
      printable: [
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
        'https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/a20012a2d4d5b9db43dfc6a01fe508c0.png~tplv-uwbnlip3yd-webp.webp',
      ],
      type: 'image',
      header: 'Multiple Images',
      imageStyle: 'width:100%;',
    });
  }
</script>

<style scoped></style>
