<template>
  <div>
    <a-card title="富文本编辑器">
      <div class="editor">
        <Toolbar
          class="editor-border"
          :editor="editorRef"
          :defaultConfig="toolbarConfig"
          :mode="mode"
        />
        <Editor
          style="height: 500px; overflow-y: hidden"
          v-model="valueHtml"
          :defaultConfig="editorConfig"
          :mode="mode"
          @onCreated="handleCreated"
        />
      </div>
      <template #actions>
        <web-site-link
          label="wangEditor官网："
          link="https://www.wangeditor.com/"
          class="mt-10px"
        />
      </template>
    </a-card>
  </div>
</template>

<script lang="ts" setup>
  import '@wangeditor/editor/dist/css/style.css'; // 引入 css

  import { onBeforeUnmount, ref, shallowRef, onMounted } from 'vue';
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue';
  import { IDomEditor } from '@wangeditor/editor';

  const mode = 'default'; // 或 'simple'

  // 编辑器实例，必须用 shallowRef
  const editorRef = shallowRef();

  // 内容 HTML
  const valueHtml = ref('<p>hello</p>');

  // 模拟 ajax 异步获取内容
  onMounted(() => {
    setTimeout(() => {
      valueHtml.value = '<p>模拟 Ajax 异步设置内容</p>';
    }, 1500);
  });

  const toolbarConfig = {};
  const editorConfig = { placeholder: '请输入内容...' }; // 配置

  // 组件销毁时，也及时销毁编辑器
  onBeforeUnmount(() => {
    const editor = editorRef.value;
    if (editor == null) return;
    editor.destroy();
  });

  const handleCreated = (editor: IDomEditor) => {
    editorRef.value = editor; // 记录 editor 实例，重要！
  };
</script>

<style lang="less" scoped>
  @import 'styles/index.module.less';
</style>
