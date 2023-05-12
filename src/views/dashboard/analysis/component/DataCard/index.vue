<template>
  <a-card class="general-card mb-15px" :header-style="{ paddingBottom: '15px' }">
    <a-grid :cols="24" :col-gap="12" :row-gap="12">
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :title="$t('dashboard.analysis.data-card.visits')"
          chart-type="line"
          :card-style="{
            background: theme.darkMode
              ? 'linear-gradient(180deg, #284991 0%, #122B62 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :title="$t('dashboard.analysis.data-card.downloads')"
          chart-type="bar"
          :card-style="{
            background: theme.darkMode
              ? ' linear-gradient(180deg, #3D492E 0%, #263827 100%)'
              : 'linear-gradient(180deg, #F5FEF2 0%, #E6FEEE 100%)',
          }"
        />
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :title="$t('dashboard.analysis.data-card.comments')"
          quota="comment"
          chart-type="line"
          :card-style="{
            background: theme.darkMode
              ? 'linear-gradient(180deg, #294B94 0%, #0F275C 100%)'
              : 'linear-gradient(180deg, #f2f9fe 0%, #e6f4fe 100%)',
          }"
        />
        <div></div>
      </a-grid-item>
      <a-grid-item :span="{ xs: 12, sm: 12, md: 12, lg: 12, xl: 6, xxl: 6 }">
        <DataItem
          :title="$t('dashboard.analysis.data-card.sharing')"
          chart-type="pie"
          :card-style="{
            background: theme.darkMode
              ? 'linear-gradient(180deg, #312565 0%, #201936 100%)'
              : 'linear-gradient(180deg, #F7F7FF 0%, #ECECFF 100%)',
          }"
        />
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
  import { useThemeStore } from '@/store';
  // import useLoading from '@/hooks/loading';
  import { DataItem } from './component';

  const theme = useThemeStore();
  // const { loading, setLoading } = useLoading(true);
</script>

<style lang="less" scoped>
  .general-card {
    border-radius: 4px;
    border: none;
    & > .arco-card-header {
      height: auto;
      padding: 20px;
      border: none;
    }
    & > .arco-card-body {
      padding: 0 20px 20px 20px;
    }
  }
</style>
