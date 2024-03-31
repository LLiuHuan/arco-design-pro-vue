<template>
  <ADivider>{{ $t('layout.setting.interfaceFunction.title') }}</ADivider>

  <TransitionGroup
    tag="div"
    name="interface-function"
    class="flex-col-stretch gap-12px"
  >
    <SettingItem
      v-for="(item, key) in interfaceFunctions"
      :key="key"
      :label="$t(item.label)"
    >
      <SwitchItem
        v-if="item.type === 'switch'"
        :change="item.change"
        :model-value="item.modelValue"
      ></SwitchItem>

      <SelectItem
        v-else-if="item.type === 'select'"
        :model-value="item.modelValue"
        :change="item.change"
        :options="triggerOptions"
      />
    </SettingItem>
  </TransitionGroup>
</template>

<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { useMenuSetting } from '@/hooks/setting';
  import { getMenuTriggerOptions } from './helpers';
  import { SettingItem, SwitchItem, SelectItem } from '../common';

  defineOptions({
    name: 'InterfaceFunction',
  });

  interface InterfaceFunction {
    type: 'switch' | 'select';
    label: string;
    modelValue: any;
    change: any;
  }

  const {
    getCollapsed,
    toggleCollapsed,
    getTrigger,
    setMenuSetting,
    getAccordion,
  } = useMenuSetting();

  const triggerOptions = getMenuTriggerOptions(unref(false));

  const interfaceFunctions = ref<InterfaceFunction[]>([
    {
      label: 'layout.setting.interfaceFunction.menuCollapse',
      type: 'switch',
      modelValue: getCollapsed,
      change: toggleCollapsed,
    },
    {
      label: 'layout.setting.interfaceFunction.menuCollapseButton',
      type: 'select',
      modelValue: getTrigger,
      change: setMenuSetting,
    },
    {
      label: 'layout.setting.interfaceFunction.menuAccordion',
      type: 'switch',
      modelValue: getAccordion,
      change: setMenuSetting,
    },
  ]);
</script>

<style lang="less" scoped></style>
