<template>
  <div class="flex-center">
    <SvgIcon
      :icon="
        position === SettingButtonPositionEnum.HEADER
          ? 'mingcute:settings-6-fill'
          : 'lets-icons:setting-alt-line'
      "
      :size="size"
    ></SvgIcon>
  </div>
</template>

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
    size: 20,
  });
</script>

<style lang="less" scoped></style>
