<template>
  <div
    v-if="getIsFixedSettingDrawer && (!getShowMultipleTab || getFullContent)"
    class="absolute z-10 top-45% right-0 p-10px bg-[rgba(var(--primary-6))] rounded-l-6px flex-center text-[var(--color-white)] cursor-pointer"
    @click="setSettingDrawerState(true)"
  >
    <SettingBtn :position="SettingButtonPositionEnum.FIXED" :size="16" />
  </div>
</template>

<script lang="ts" setup>
  import {
    useHeaderSetting,
    useMultipleTabSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { useFullContent } from '@/hooks/web/useFullContent';
  import { computed, unref } from 'vue';
  import { SettingButtonPositionEnum } from '@/enums';
  import SettingBtn from '@/layout/common/setting-btn/index.vue';

  defineOptions({ name: 'LayoutFeatures' });

  const { getFullContent } = useFullContent();
  const { getShowMultipleTab } = useMultipleTabSetting();
  const { getShowHeader } = useHeaderSetting();
  const {
    getShowSettingButton,
    getSettingButtonPosition,
    setSettingDrawerState,
  } = useRootSetting();

  const getIsFixedSettingDrawer = computed(() => {
    if (!unref(getShowSettingButton)) {
      return false;
    }
    const settingButtonPosition = unref(getSettingButtonPosition);

    if (settingButtonPosition === SettingButtonPositionEnum.AUTO) {
      return !unref(getShowHeader) || unref(getFullContent);
    }
    return settingButtonPosition === SettingButtonPositionEnum.FIXED;
  });
</script>

<style lang="less" scoped></style>
