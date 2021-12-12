<template>
  <div class="container">
    <a-split :style="{ height: '500px', border: '1px solid var(--color-border)' }">
      <template #first>
        <div style="background-color: #f38181; width: 100%; height: 100%">Right</div>
      </template>
      <template #second>
        <div>
          <a-split direction="vertical" :style="{ height: '495px' }">
            <template #first
              ><div style="background-color: #fce38a; width: 100%; height: 100%">Top</div></template
            >
            <template #second
              ><div style="background-color: #95e1d3; width: 100%; height: 100%"
                >Bottom</div
              ></template
            >
          </a-split>
        </div>
      </template>
    </a-split>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SplitDemo',
    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
