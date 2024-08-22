<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-22 17:52:07
 * @LastEditTime: 2024-08-22 13:45:49
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { ref } from 'vue';
  import { Size } from '@arco-design/web-vue';
  import { useI18n } from '@/hooks/web/useI18n';
  import { useTableContext } from '../../hooks/useTableContext';

  defineOptions({ name: 'SizeSetting' });

  const { t } = useI18n();

  const table = useTableContext();

  const sizeList = [
    { key: 'large', label: 'component.table.settingLarge' },
    { key: 'medium', label: 'component.table.settingMedium' },
    { key: 'small', label: 'component.table.settingSmall' },
    { key: 'mini', label: 'component.table.settingMini' },
  ];
  const sizeRef = ref<Size | undefined>(table.getSize());

  const handleSizeSelect = (size: Size) => {
    sizeRef.value = size;
    table.setProps({
      size,
    });
  };
</script>

<template>
  <ADropdown @select="handleSizeSelect">
    <ATooltip content="大小" position="top">
      <div>
        <SvgIcon
          class="cursor-pointer"
          icon="fluent:auto-fit-height-24-regular"
          size="20"
        />
      </div>
    </ATooltip>
    <template #content>
      <ADoption
        v-for="item in sizeList"
        :key="item.key"
        :class="[sizeRef === item.key ? 'arco-doption-active' : '']"
        :value="item.key"
      >
        {{ t(item.label) }}
      </ADoption>
    </template>
  </ADropdown>
</template>

<style lang="less" scoped></style>
