<template>
  <ACard :bordered="false" class="">
    <AGrid :col-gap="12" :cols="24" :row-gap="12">
      <AGridItem :span="{ xs: 24, sm: 24, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :chart-option="line1Option"
          :style="{
            background: getIsDarkMode
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
          :title="$t('dashboard.analysis.visits')"
          class="!rounded-4px"
        />
      </AGridItem>
      <AGridItem :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :chart-option="barOption"
          :style="{
            background: getIsDarkMode
              ? 'linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
          :title="$t('dashboard.analysis.visits')"
          class="!rounded-4px"
        />
      </AGridItem>
      <AGridItem :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :chart-option="line2Option"
          :style="{
            background: getIsDarkMode
              ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
              : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
          }"
          :title="$t('dashboard.analysis.visits')"
          class="!rounded-4px"
        />
      </AGridItem>
      <AGridItem :span="{ xs: 24, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :chart-option="pieOption"
          :style="{
            background: getIsDarkMode
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
          :title="$t('dashboard.analysis.visits')"
          class="!rounded-4px"
        />
      </AGridItem>
    </AGrid>
  </ACard>
</template>

<script lang="ts" setup>
  import { useRootSetting } from '@/hooks/setting';
  import { barOption, line1Option, line2Option, pieOption } from './data';
  import DataItem from './DataItem.vue';

  const { getIsDarkMode } = useRootSetting();
</script>

<style lang="less" scoped></style>
