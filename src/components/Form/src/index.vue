<template>
  <AForm ref="formElRef" :model="formModel" v-bind="getBindValue">
    <ARow></ARow>
  </AForm>
</template>

<script lang="ts" setup>
  import { computed, reactive, ref } from 'vue';

  const formElRef = ref();
  const formModel = reactive({});

  defineProps();
  const emit = defineEmits();

  const getBindValue = computed(() => ({}));
</script>

<style lang="less" scoped></style>
