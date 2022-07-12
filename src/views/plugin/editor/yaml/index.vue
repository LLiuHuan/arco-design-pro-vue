<template>
  <a-card title="Yaml 编辑器">
    <codemirror
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' }"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="log('ready', $event)"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
    />
  </a-card>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { yaml } from '@codemirror/legacy-modes/mode/yaml';
  import { StreamLanguage } from '@codemirror/language';
  import { Codemirror } from 'vue-codemirror';
  import { oneDark } from '@codemirror/theme-one-dark';

  const { log } = console;

  const code = ref(`console.log('Hello, world!')`);
  const extensions = [StreamLanguage.define(yaml), oneDark];
</script>
