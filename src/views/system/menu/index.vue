<template>
  <div class="container">
    <a-table :data="data">
      <template #columns>
        <a-table-column title="Name" data-index="name" />
        <a-table-column title="Salary" data-index="salary" />
        <a-table-column title="Address" data-index="address" />
        <a-table-column title="Email" data-index="email" />
        <a-table-column title="Optional">
          <template #cell="{ record }">
            <a-button @click="$modal.info({ title: 'Name', content: record.name })">view</a-button>
          </template>
        </a-table-column>
      </template>
    </a-table>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  export default defineComponent({
    name: 'SystemMenu',
    setup() {
      return {};
    },
  });
</script>

<style scoped></style>
