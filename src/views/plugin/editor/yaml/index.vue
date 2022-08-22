<template>
  <div>
    yaml 编辑器
    <!--    <a-card title="monaco-editor">-->
    <!--      <div ref="editorRef" id="editor" class="w-full h-500px border-1px"></div>-->
    <!--    </a-card>-->
  </div>
</template>

<script lang="ts" setup>
  // import { nextTick, ref, toRaw } from 'vue';
  // import * as monaco from 'monaco-editor';
  // import { setDiagnosticsOptions } from 'monaco-yaml';
  // import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker';
  // import YamlWorker from './yaml.worker?worker';
  // // import YamlWorker from 'monaco-yaml/yaml.worker.js?worker';
  //
  // const editorRef = ref<HTMLDivElement | null>(null);
  // const editor = ref();
  //
  // window.MonacoEnvironment = {
  //   getWorker(moduleId: any, label: any) {
  //     console.log(moduleId);
  //     if (label === 'yaml') {
  //       // return new EditorWorker();
  //       return new YamlWorker();
  //     }
  //     return new EditorWorker();
  //   },
  // };
  //
  // setDiagnosticsOptions({
  //   enableSchemaRequest: true,
  //   hover: true,
  //   completion: true,
  //   validate: true,
  //   format: true,
  // });
  //
  // nextTick(() => {
  //   if (!editorRef.value) return;
  //   editor.value = monaco.editor.create(editorRef.value, {
  //     language: 'yaml',
  //     automaticLayout: true,
  //     model: monaco.editor.createModel('# test yaml \n', 'yaml'),
  //   });
  //
  //   // 监听值的变化
  //   editor.value.onDidChangeModelContent(() => {
  //     // 给父组件实时返回最新文本
  //     console.log(toRaw(editor.value).getValue());
  //   });
  // });
</script>

<style lang="less" scoped></style>
