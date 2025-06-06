<!--
 * @Description: 项目配置-外观-主题模式
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 18:06:46
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { AppEnum } from '@/enums';
  import {
    useLayoutSetting,
    useMenuSetting,
    useRootSetting,
  } from '@/hooks/setting';
  import { useI18n } from '@/hooks/web/useI18n';

  import { HandlerEnum, SettingItem, SwitchItem, TitleItem } from '../common';

  defineOptions({
    name: 'ThemeScheme',
  });

  const icons: Record<AppEnum, string> = {
    [AppEnum.LIGHT]: 'ic:round-wb-sunny',
    [AppEnum.DARK]: 'ic:round-nightlight',
    [AppEnum.AUTO]: 'ic:round-hdr-auto',
  };

  const themeSchema = {
    [AppEnum.LIGHT]: 'layout.setting.exterior.schema.light',
    [AppEnum.DARK]: 'layout.setting.exterior.schema.dark',
    [AppEnum.AUTO]: 'layout.setting.exterior.schema.system',
  };

  const { setDarkMode, getDarkMode, getIsDarkMode } = useRootSetting();
  const { getIsMenuDark } = useMenuSetting();
  const { getLayoutMode } = useLayoutSetting();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.exterior.schema.title') }}</TitleItem>

    <div class="flex-col-stretch gap-12px">
      <div class="flex justify-center items-center">
        <a-radio-group
          :model-value="getDarkMode"
          size="large"
          @change="setDarkMode"
        >
          <template v-for="(item, key) in themeSchema" :key="key">
            <a-radio class="!mr-10px !p-0" :value="key">
              <template #radio="{ checked }">
                <div class="flex flex-col items-center">
                  <div
                    :class="{ 'radio-card-checked': checked }"
                    class="radio-card shadow-sm dark:shadow-coolGray-5"
                  >
                    <div class="h-30px flex justify-center items-center">
                      <SvgIcon :icon="icons[key]" size="20" />
                    </div>
                  </div>
                  <div>{{ t(item) }}</div>
                </div>
              </template>
            </a-radio>
          </template>
        </a-radio-group>
      </div>
      <Transition name="dark-menu">
        <SettingItem
          v-if="!getIsDarkMode && getLayoutMode.includes('vertical')"
          :label="t(`layout.setting.exterior.schema.darkMenu`)"
        >
          <SwitchItem :def="getIsMenuDark" :event="HandlerEnum.MENU_THEME" />
        </SettingItem>
      </Transition>
    </div>
  </div>
</template>

<style lang="less" scoped>
  :deep(.arco-radio) {
    margin: 0;
  }

  .radio-card {
    padding: 10px 16px;
    border: 2px solid transparent;
    border-radius: 4px;
    width: 100px;
    box-sizing: border-box;
  }

  .radio-card-mask {
    height: 14px;
    width: 14px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 100%;
    border: 2px solid var(--color-border-2);
    box-sizing: border-box;
  }

  .radio-card-mask-dot {
    width: 8px;
    height: 8px;
    border-radius: 100%;
  }

  .radio-card-title {
    color: var(--color-text-1);
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 8px;
  }

  .radio-card:hover,
  .radio-card-checked,
  .radio-card:hover .radio-card-mask,
  .radio-card-checked .radio-card-mask {
    //border-color: rgb(var(--primary-6));
    border: 2px solid rgba(var(--primary-5));
  }

  // .radio-card-checked {
  //background-color: var(--color-primary-light-1);
  // }

  .radio-card:hover .radio-card-title,
  .radio-card-checked .radio-card-title {
    color: rgb(var(--primary-6));
  }

  .radio-card-checked .radio-card-mask-dot {
    background-color: rgb(var(--primary-6));
  }
</style>
