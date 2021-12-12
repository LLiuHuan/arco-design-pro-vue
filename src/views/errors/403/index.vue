<template>
  <div class="container">
    <a-result class="result" status="403" :title="$t('exception.result.403.description')">
      <template #subtitle>
        <a-button key="back" type="primary"> {{ $t('exception.result.403.back') }} </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '403',
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  .container {
    position: relative;
    //background-color: var(--color-bg-1);
    height: 100%;
    max-width: 100%;
  }

  .result {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  :deep(.arco-result-subtitle) {
    padding-top: 15px;
  }
</style>
