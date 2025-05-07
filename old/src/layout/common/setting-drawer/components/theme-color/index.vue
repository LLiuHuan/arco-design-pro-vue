<!--
 * @Description: 项目配置-外观-主题颜色
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-21 16:40:10
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';
  import { SettingItem, TitleItem } from '../common';

  defineOptions({
    name: 'ThemeColor',
  });

  const historyColors = ref<string[]>([]);
  const { getThemeColor, setThemeColor } = useRootSetting();

  const { t } = useI18n();

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

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.exterior.color.title') }}</TitleItem>

    <div class="flex-col-stretch">
      <SettingItem
        v-for="(_, key) in getThemeColor"
        :key="key"
        :label="t(`layout.setting.exterior.color.${key}`)"
      >
        <AColorPicker
          :history-colors="historyColors"
          :model-value="getThemeColor[key]"
          disabled-alpha
          show-history
          show-preset
          show-text
          @change="setThemeColor(key, $event)"
          @popup-visible-change="addHistoryColor"
        />
      </SettingItem>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
