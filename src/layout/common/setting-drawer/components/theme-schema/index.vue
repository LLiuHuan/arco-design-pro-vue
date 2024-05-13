<template>
  <ADivider>{{ $t('layout.setting.themeSchema.title') }}</ADivider>

  <div class="flex-col-stretch gap-12px">
    <div class="flex justify-center items-center">
      <ARadioGroup
        v-for="(_, key) in themeSchema"
        :key="key"
        type="button"
        size="large"
        :model-value="getDarkMode"
        @change="setDarkMode"
      >
        <ARadio :value="key">
          <div class="h-30px w-50px flex justify-center items-center">
            <SvgIcon :icon="icons[key]" size="20"></SvgIcon>
          </div>
        </ARadio>
      </ARadioGroup>
    </div>
    <Transition name="dark-menu">
      <SettingItem
        v-if="!getIsDarkMode"
        :label="$t(`layout.setting.themeSchema.darkMenu`)"
      >
        <SwitchItem
          :event="HandlerEnum.MENU_THEME"
          :def="getIsMenuDark"
        ></SwitchItem>
      </SettingItem>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { AppEnum } from '@/enums';
  import { useMenuSetting, useRootSetting } from '@/hooks/setting';
  import { computed } from 'vue';
  import { HandlerEnum, SettingItem, SwitchItem } from '../common';

  defineOptions({
    name: 'ThemeScheme',
  });

  const icons: Record<AppEnum, string> = {
    [AppEnum.LIGHT]: 'ic:round-wb-sunny',
    [AppEnum.DARK]: 'ic:round-nightlight',
    [AppEnum.AUTO]: 'ic:round-hdr-auto',
  };

  const themeSchema = {
    [AppEnum.LIGHT]: 'layout.setting.themeSchema.light',
    [AppEnum.DARK]: 'layout.setting.themeSchema.dark',
    [AppEnum.AUTO]: 'layout.setting.themeSchema.system',
  };

  const { setDarkMode, getDarkMode, getIsDarkMode } = useRootSetting();
  const { getMenuTheme } = useMenuSetting();

  const getIsMenuDark = computed(() => getMenuTheme.value === AppEnum.DARK);
</script>

<style lang="less" scoped></style>
