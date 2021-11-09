<template>
  <a-dropdown trigger="click" position="br">
    <div class="messageBoxTrigger">
      <a-badge :count="9" dot>
        <icon-notification />
      </a-badge>
    </div>
    <template #content>
      <div class="messageBox">
        <drop-content />
      </div>
    </template>
  </a-dropdown>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import DropContent from '@/components/DropContent/index.vue';
  export default defineComponent({
    name: 'MessageBox',
    components: {
      DropContent,
    },
    setup() {
      return {};
    },
  });
</script>

<style lang="less" scoped>
  .messageBoxTrigger {
    padding: 16px 0;
    width: 20px;
    text-align: center;
    cursor: pointer;
    color: var(--color-text-1);

    &:hover {
      color: rgb(var(--arcoblue-6));
    }
  }

  .messageBox {
    min-width: 352px;
    max-height: 800px;

    :global(.arco-tabs-nav) {
      padding: 8px 0 12px 0;
      border-bottom: 1px solid var(--color-neutral-3);
    }

    :global(.arco-tabs-header) {
      margin: 0 auto;
    }

    :global(.arco-list-item-meta) {
      align-items: flex-start;
    }
  }
</style>
