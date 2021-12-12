<template>
  <div class="container">
    <a-result class="result" status="404" :title="$t('exception.result.404.description')">
      <template #subtitle>
        <a-button key="again" style="margin-right: 16px">
          {{ $t('exception.result.404.retry') }}
        </a-button>
        <a-button key="back" type="primary"> {{ $t('exception.result.404.back') }} </a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: '404',
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  .container {
    position: relative;
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
