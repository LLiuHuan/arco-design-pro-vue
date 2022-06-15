<template>
  <div class="container-view">
    <a-result class="result" status="404" :title="$t('exception.result.404.description')">
      <template #subtitle>
        <a-button key="again" style="margin-right: 16px">
          {{ $t('exception.result.404.retry') }}
        </a-button>
        <a-button key="back" type="primary"> {{ $t('exception.result.404.back') }}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .container-view {
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
