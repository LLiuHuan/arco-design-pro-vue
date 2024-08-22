<!--
 * @Description: 
 * @Author: LLiuHuan
 * @Date: 2024-05-13 22:31:00
 * @LastEditTime: 2024-08-22 16:57:31
 * @LastEditors: LLiuHuan
-->
<script lang="ts" setup>
  import { SvgIcon } from '@/components/Icon';
  import { SettingButtonPositionEnum } from '@/enums';

  interface Props {
    // 显示位置
    position?: SettingButtonPositionEnum;

    size?: number;
  }

  withDefaults(defineProps<Props>(), {
    position: SettingButtonPositionEnum.AUTO,
    size: 18,
  });
</script>

<template>
  <div class="flex-center">
    <SvgIcon
      :icon="
        position === SettingButtonPositionEnum.HEADER
          ? 'mingcute:settings-6-fill'
          : 'lets-icons:setting-alt-line'
      "
      :size="size"
    />
  </div>
</template>

<style lang="less" scoped></style>
