<!--
 * @Description: 项目配置-布局-版权
 * @Author: LLiuHuan
 * @Date: 2024-08-21 17:49:34
 * @LastEditTime: 2024-08-22 12:15:52
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { useI18n } from '@/hooks/web/useI18n';
  import { useCopyrightSetting } from '@/hooks/setting';
  import {
    HandlerEnum,
    SettingItem,
    SwitchItem,
    InputItem,
    TitleItem,
  } from '../common';

  const {
    getCopyrightShow,
    getCompany,
    getCompanyLink,
    getRecord,
    getRecordLink,
    getPolice,
    getPoliceLink,
  } = useCopyrightSetting();

  const { t } = useI18n();
</script>

<template>
  <div class="flex flex-col py-4">
    <TitleItem>{{ t('layout.setting.layout.copyright.title') }}</TitleItem>

    <TransitionGroup
      class="flex-col-stretch"
      name="interface-function"
      tag="div"
    >
      <SettingItem key="1" :label="t('layout.setting.layout.copyright.show')">
        <SwitchItem
          :def="getCopyrightShow"
          :event="HandlerEnum.COPYRIGHT_SHOW"
        />
      </SettingItem>

      <SettingItem
        v-if="getCopyrightShow"
        key="2"
        :label="t('layout.setting.layout.copyright.company')"
      >
        <InputItem :def="getCompany" :event="HandlerEnum.COPYRIGHT_COMPANY" />
      </SettingItem>

      <SettingItem
        v-if="getCopyrightShow"
        key="3"
        :label="t('layout.setting.layout.copyright.companyLink')"
      >
        <InputItem
          :def="getCompanyLink"
          :event="HandlerEnum.COPYRIGHT_COMPANY_LINK"
        />
      </SettingItem>
      <SettingItem
        v-if="getCopyrightShow"
        key="4"
        :label="t('layout.setting.layout.copyright.record')"
      >
        <InputItem :def="getRecord" :event="HandlerEnum.COPYRIGHT_RECORD" />
      </SettingItem>
      <SettingItem
        v-if="getCopyrightShow"
        key="5"
        :label="t('layout.setting.layout.copyright.recordLink')"
      >
        <InputItem
          :def="getRecordLink"
          :event="HandlerEnum.COPYRIGHT_RECORD_LINK"
        />
      </SettingItem>

      <SettingItem
        v-if="getCopyrightShow"
        key="6"
        :label="t('layout.setting.layout.copyright.policeRecord')"
      >
        <InputItem :def="getPolice" :event="HandlerEnum.COPYRIGHT_POLICE" />
      </SettingItem>
      <SettingItem
        v-if="getCopyrightShow"
        key="7"
        :label="t('layout.setting.layout.copyright.policeRecordLink')"
      >
        <InputItem
          :def="getPoliceLink"
          :event="HandlerEnum.COPYRIGHT_POLICE_LINK"
        />
      </SettingItem>
    </TransitionGroup>
  </div>
</template>

<style lang="less" scoped></style>
