<!--<template>-->
<!--  <div>-->
<!--    <textarea ref="textarea" id="" cols="30" rows="10"></textarea>-->
<!--  </div>-->
<!--</template>-->
<!--<script lang="ts" setup>-->
<!--  import 'codemirror/lib/codemirror.css';-->
<!--  import 'codemirror/mode/css/css.js';-->
<!--  import 'codemirror/mode/yaml/yaml.js';-->
<!--  import 'codemirror/mode/yaml-frontmatter/yaml-frontmatter.js';-->
<!--  import '`codemirror`/mode/javascript/javascript';-->
<!--  import 'codemirror/addon/selection/active-line'; // 代码高亮-->
<!--  import 'codemirror/addon/fold/foldgutter.css';-->
<!--  import 'codemirror/addon/fold/foldcode';-->
<!--  import 'codemirror/addon/fold/brace-fold';-->
<!--  import 'codemirror/addon/scroll/simplescrollbars.css';-->
<!--  import 'codemirror/addon/scroll/simplescrollbars';-->
<!--  import 'codemirror/addon/hint/show-hint';-->
<!--  import 'codemirror/addon/hint/javascript-hint';-->
<!--  import 'codemirror/addon/hint/anyword-hint';-->
<!--  import 'codemirror/addon/hint/css-hint';-->
<!--  import 'codemirror/addon/hint/show-hint.css';-->
<!--  import 'codemirror/theme/rubyblue.css';-->
<!--  import 'codemirror/theme/xq-light.css';-->
<!--  import 'codemirror/theme/monokai.css'; // 主题-->
<!--  import { defineProps, onMounted, ref } from 'vue';-->
<!--  import CodeMirror from 'codemirror';-->

<!--  interface Props {-->
<!--    value?: object | string;-->
<!--    mode: string;-->
<!--    readonly: boolean;-->
<!--  }-->
<!--  const props = withDefaults(defineProps<Props>(), {-->
<!--    mode: 'yaml',-->
<!--    readonly: false,-->
<!--  });-->

<!--  const emit = defineEmits(['change', 'input']);-->

<!--  const codeMirrorEditor = ref();-->
<!--  const textarea = ref();-->

<!--  const initCodeMirrorEditor = () => {-->
<!--    codeMirrorEditor.value = CodeMirror.fromTextArea(textarea, {-->
<!--      mode: props.mode,-->
<!--      lineNumbers: true, // 显示行数-->
<!--      lint: true,-->
<!--      indentUnit: 2, // 缩进单位为2-->
<!--      smartIndent: true, // 自动缩进是否开启-->
<!--      styleActiveLine: true, // 当前行背景高亮-->
<!--      matchBrackets: true, // 括号匹配-->
<!--      lineWrapping: true, // 自动换行-->
<!--      tabSize: 2,-->
<!--      // styleActiveLine: true, // 设置光标所在行高亮-->
<!--      readOnly: props.readonly,-->
<!--      theme: 'rubyblue',-->
<!--      scrollbarStyle: 'overlay',-->
<!--    });-->

<!--    if (this.value) setCodeMirrorEditorValue(this.value); // 设置值-->
<!--    codeMirrorEditor.value.on('change', () => {-->
<!--      const EditorValue = getCodeMirrorEditorValue();-->
<!--      emit('change', EditorValue);-->
<!--      emit('input', EditorValue);-->
<!--    });-->
<!--  };-->

<!--  // 设置编辑器支持的语言mode-->
<!--  const setCodeMirrorEditorMode = (option) => {-->
<!--    codeMirrorEditor.value.setOption('mode', option);-->
<!--  };-->

<!--  // 获取编辑器内容-->
<!--  const getCodeMirrorEditorValue = () => {-->
<!--    return codeMirrorEditor.value.getValue();-->
<!--  };-->
<!--  // 设置编辑器内容-->
<!--  const setCodeMirrorEditorValue = (value) => {-->
<!--    return codeMirrorEditor.value.setValue(value);-->
<!--  };-->
<!--  // 刷新编辑器-->
<!--  const refreshCodeMirrorEditor = () => {-->
<!--    codeMirrorEditor.value.refresh();-->
<!--  };-->

<!--  onMounted(() => {-->
<!--    setTimeout(initCodeMirrorEditor, 500);-->
<!--  });-->
<!--</script>-->
