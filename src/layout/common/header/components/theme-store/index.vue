<template>
  <HoverContainer
    :tooltip-content="$t('layout.themeStore.title')"
    @click="toggleModal"
  >
    <AButton type="text" class="!text-[var(--color-text-1)] !h-40px">
      <SvgIcon icon="la:themeco" size="20"> </SvgIcon>
    </AButton>
  </HoverContainer>

  <AModal
    v-model:visible="show"
    :title="$t('layout.themeStore.title')"
    width="55%"
    draggable
    @cancel="toggleModal"
  >
    <ThemeStore />
    <template #footer>
      <div class="flex justify-between items-center">
        <span
          >{{ $t('layout.themeStore.currentTheme') }}：{{
            getThemePro?.themeName ?? '默认主题'
          }}</span
        >
        <AButton type="primary" status="danger" @click="resetTheme">
          <template #icon>
            <IconClose />
          </template>
          {{ $t('layout.themeStore.restoreThemeDefault') }}
        </AButton>
      </div>
    </template>
  </AModal>
</template>

<script lang="ts" setup>
  import { HoverContainer } from '@/components/HoverContainer';
  import { ThemeStore } from '@/components/ThemeStore';
  import { SvgIcon } from '@/components/Icon';
  import { ref } from 'vue';
  import { useRootSetting } from '@/hooks/setting';
  import { resetProTheme, setThemeColors } from '@/utils/common';
  import { appSetting } from '@/settings';

  const show = ref(false);
  const { getThemePro, setThemePro } = useRootSetting();

  // 打开/关闭主题商店
  const toggleModal = () => {
    show.value = !show.value;
  };

  // 重置主题
  const resetTheme = async () => {
    resetProTheme();
    const { colors } = appSetting.themeSetting;
    setThemePro(null);

    setThemeColors(colors);
  };
</script>

<style lang="less" scoped></style>
