<template>
  <ADivider>{{ $t('layout.setting.themeColor.title') }}</ADivider>

  <div class="flex-col-stretch gap-16px">
    <SettingItem
      v-for="(_, key) in getThemeColor"
      :key="key"
      :label="$t(`layout.setting.themeColor.${key}`)"
    >
      <AColorPicker
        :model-value="getThemeColor[key]"
        :history-colors="historyColors"
        show-preset
        show-history
        show-text
        disabled-alpha
        @popup-visible-change="addHistoryColor"
        @change="setThemeColor(key, $event)"
      />
    </SettingItem>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import SettingItem from '../setting-item/index.vue';

  const historyColors = ref<string[]>([]);
  const { getThemeColor, setThemeColor } = useRootSetting();

  const addHistoryColor = (visible: boolean, color: string) => {
    if (!visible) {
      const index = historyColors.value.indexOf(color);
      if (index !== -1) {
        historyColors.value.splice(index, 1);
      }
      historyColors.value.unshift(color);
    }
  };
</script>

<style lang="less" scoped></style>
