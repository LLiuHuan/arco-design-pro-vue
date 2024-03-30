<template>
  <ADivider>{{ $t('layout.setting.interfaceFunction.title') }}</ADivider>

  <TransitionGroup
    tag="div"
    name="interface-function"
    class="flex-col-stretch gap-12px"
  >
    <SettingItem
      key="1"
      :label="$t(`layout.setting.interfaceFunction.menuCollapse`)"
    >
      <ASwitch :model-value="getCollapsed" @change="toggleCollapsed">
        <template #checked-icon>
          <icon-check />
        </template>
        <template #unchecked-icon>
          <icon-close />
        </template>
      </ASwitch>
    </SettingItem>
    <SettingItem
      key="2"
      :label="$t(`layout.setting.interfaceFunction.menuCollapseButton`)"
    >
      <ASelect
        class="!w-126px"
        :model-value="getTrigger"
        @change="setMenuSetting({ trigger: $event })"
      >
        <AOption
          v-for="item in triggerOptions"
          :key="item.value"
          :value="item.value"
          >{{ $t(item.label) }}</AOption
        >
      </ASelect>
    </SettingItem>
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import { unref } from 'vue';
  import { useMenuSetting } from '@/hooks/setting';
  import SettingItem from '../setting-item/index.vue';
  import { getMenuTriggerOptions } from './helpers';

  defineOptions({
    name: 'InterfaceFunction',
  });

  const { getCollapsed, toggleCollapsed, getTrigger, setMenuSetting } =
    useMenuSetting();

  const triggerOptions = getMenuTriggerOptions(unref(false));
</script>

<style lang="less" scoped></style>
