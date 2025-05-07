<!--
 * @Description: 项目配置-布局-面包屑
 * @Author: LLiuHuan
 * @Date: 2024-08-21 10:58:11
 * @LastEditTime: 2024-08-21 15:01:03
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useHeaderSetting } from '@/hooks/setting';
  import { HandlerEnum, TitleItem, SettingItem, SwitchItem } from '../common';

  defineOptions({
    name: 'LayoutBreadcrumb',
  });

  const { getHeaderShowBreadCrumb, getHeaderShowBreadCrumbIcon } =
    useHeaderSetting();
  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.breadcrumb.title') }}</TitleItem>

    <SettingItem
      key="1"
      :label="t('layout.setting.layout.breadcrumb.headerBreadcrumb')"
    >
      <SwitchItem
        :def="getHeaderShowBreadCrumb"
        :event="HandlerEnum.HEADER_BREADCRUMB"
      />
    </SettingItem>
    <SettingItem
      key="2"
      :label="t('layout.setting.layout.breadcrumb.headerBreadcrumbIcon')"
    >
      <SwitchItem
        :def="getHeaderShowBreadCrumbIcon"
        :event="HandlerEnum.HEADER_BREADCRUMB_ICON"
      />
    </SettingItem>
  </div>
</template>

<style lang="less" scoped></style>
