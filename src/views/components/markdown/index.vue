<template>
  <div class="container">
    <a-card :bordered="false" title="v-md-editor" class="proCard" size="small">
      <div>
        <a-alert :show-icon="false">
          <a-link href="https://ckang1229.gitee.io/vue-markdown-editor/zh/#%E4%BB%8B%E7%BB%8D"
            >v-md-editor
          </a-link>
          推荐亮色模式下使用
        </a-alert>
      </div>
      <v-md-editor
        v-model="text"
        left-toolbar="undo redo clear | h bold italic strikethrough quote | ul ol table hr | link image code | save | tip ｜ emoji"
        height="500px"
        @save="saveText"
      />
    </a-card>
    <a-card :bordered="false" title="v-md-editor 预览效果" class="mt-4 proCard" size="small">
      <v-md-preview :text="previewText" />
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';

  export default defineComponent({
    name: 'MarkDown',
    setup() {
      const state = reactive({
        text: ref(''),
        previewText: ref(''),
      });
      const saveText = (text, _) => {
        state.previewText = text;
      };
      return {
        ...toRefs(state),
        saveText,
      };
    },
  });
</script>

<style scoped>
  .v-md-editor {
    background-color: var(--color-bg-4);
  }

  :deep(.v-md-editor__toolbar) {
    /*border-bottom: 1px solid var(--color-text-1);*/
  }

  :deep(.CodeMirror-scroll) {
    background-color: var(--color-bg-4);
  }

  :deep(.CodeMirror-gutter) {
    background-color: var(--color-bg-4);
  }

  :deep(.CodeMirror-code) {
    color: var(--color-text-2) !important;
  }

  /*:deep(.CodeMirror pre.CodeMirror-line) {*/
  /*  color: var(--color-bg-1);*/
  /*}*/

  :deep(.CodeMirror-activeline-background) {
    background-color: var(--color-bg-4);
  }
</style>
