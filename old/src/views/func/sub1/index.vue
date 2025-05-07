<template>
  <div>
    动态参数

    <router-link to="/feta/sub1">sub1</router-link>

    {{ computedParams }}

    <AButton @click="handleClickGo"> test </AButton>
  </div>
</template>

<script lang="ts" setup>
  import { computed, ref, unref } from 'vue';
  import { useRouter } from 'vue-router';

  const value = ref('asd');

  const { currentRoute, replace } = useRouter();

  const computedParams = computed(() => unref(currentRoute).params);

  const handleClickGo = () => {
    const { name } = unref(currentRoute);
    replace({ name: name!, params: { id: unref(value) } });
  };
</script>

<style lang="less" scoped></style>
