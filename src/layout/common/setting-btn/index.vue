<template>
  <div class="flex-center" @click="setSettingDrawerState(true)">
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
  import { useRootSetting } from '@/hooks/setting';
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

  const { setSettingDrawerState } = useRootSetting();
</script>

<style lang="less" scoped></style>
