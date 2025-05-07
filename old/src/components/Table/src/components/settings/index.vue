<template>
  <div class="[&>*]:mr-12px flex">
    <RedoSetting v-if="getSetting.redo" />
    <SizeSetting v-if="getSetting.size" />
    <ColumnSetting v-if="getSetting.setting" />
    <FullScreenSetting v-if="getSetting.fullScreen" />
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import ColumnSetting from './ColumnSetting.vue';
  import SizeSetting from './SizeSetting.vue';
  import FullScreenSetting from './FullScreenSetting.vue';
  import RedoSetting from './RedoSetting.vue';
  import { TableSetting } from '../../types/table';

  interface Props {
    setting?: TableSetting;
  }

  const props = defineProps<Props>();
  const emit = defineEmits(['columnsChange']);
  // const table = useTableContext();

  const getSetting = computed((): TableSetting => {
    return {
      redo: true,
      size: true,
      setting: true,
      settingCache: false,
      fullScreen: false,
      ...props.setting,
    };
  });

  // const tableContainer = computed(() =>
  //   table ? unref(table.wrapRef) : document.body,
  // );
</script>

<style lang="less" scoped></style>
