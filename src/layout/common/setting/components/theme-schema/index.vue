<template>
  <ADivider>{{ $t('layout.setting.themeSchema.title') }}</ADivider>

  <div class="flex-col-stretch gap-12px">
    <div class="flex justify-center items-center">
      <a-radio-group
        v-for="(_, key) in themeSchema"
        :key="key"
        type="button"
        size="large"
        :model-value="getDarkMode"
        @change="setDarkMode"
      >
        <a-radio :value="key">
          <div class="h-30px w-50px flex justify-center items-center">
            <SvgIcon :icon="icons[key]" size="20"></SvgIcon>
          </div>
        </a-radio>
      </a-radio-group>
    </div>
    <Transition name="dark-menu">
      <SettingItem
        v-if="!getIsDarkMode"
        :label="$t(`layout.setting.themeSchema.darkMenu`)"
      >
        <ASwitch
          :model-value="getMenuTheme === ThemeEnum.DARK"
          @change="
            setMenuSetting({
              theme: $event ? ThemeEnum.DARK : ThemeEnum.LIGHT,
            })
          "
        >
          <template #checked-icon>
            <icon-check />
          </template>
          <template #unchecked-icon>
            <icon-close />
          </template>
        </ASwitch>
      </SettingItem>
    </Transition>
  </div>
</template>

<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { ThemeEnum } from '@/enums';
  import { useMenuSetting, useRootSetting } from '@/hooks/setting';
  import SettingItem from '@/layout/common/setting/components/setting-item/index.vue';

  defineOptions({
    name: 'ThemeScheme',
  });

  const icons: Record<ThemeEnum, string> = {
    [ThemeEnum.LIGHT]: 'ic:round-wb-sunny',
    [ThemeEnum.DARK]: 'ic:round-nightlight',
    [ThemeEnum.AUTO]: 'ic:round-hdr-auto',
  };

  const themeSchema = {
    [ThemeEnum.LIGHT]: 'layout.setting.themeSchema.light',
    [ThemeEnum.DARK]: 'layout.setting.themeSchema.dark',
    [ThemeEnum.AUTO]: 'layout.setting.themeSchema.system',
  };

  const { setDarkMode, getDarkMode, getIsDarkMode } = useRootSetting();
  const { getMenuTheme, setMenuSetting } = useMenuSetting();
</script>

<style lang="less" scoped></style>
