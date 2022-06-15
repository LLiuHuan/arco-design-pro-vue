<template>
  <div class="container-view">
    <a-result class="result" status="403" :title="$t('exception.result.403.description')">
      <template #subtitle>
        <a-button key="back" type="primary"> {{ $t('exception.result.403.back') }}</a-button>
      </template>
    </a-result>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .container-view {
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
