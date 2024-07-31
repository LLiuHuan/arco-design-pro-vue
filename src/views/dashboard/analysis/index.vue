<template>
  <div>
    <DataCard />

    <SiteAnalysis class="!my-4 enter-y" />

    <div class="md:flex enter-y mt-4">
      <VisitRadar class="md:w-1/3 w-full" />
      <VisitSource class="md:w-1/3 !md:mx-4 !md:my-0 !my-4 w-full" />
      <SalesProductPie class="md:w-1/3 w-full" />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import DataCard from './components/DataCard/index.vue';
  import SiteAnalysis from './components/SiteAnalysis/index.vue';
  import VisitRadar from './components/VisitRadar/index.vue';
  import VisitSource from './components/VisitSource/index.vue';
  import SalesProductPie from './components/SalesProductPie/index.vue';
</script>

<style lang="less" scoped></style>
