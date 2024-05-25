<template>
  <HoverContainer
    :tooltip-content="$t('layout.themeStore.title')"
    @click="toggleModal"
  >
    <AButton class="!text-[var(--color-text-1)] !h-40px" type="text">
      <SvgIcon icon="gridicons:themes" size="20"></SvgIcon>
    </AButton>
  </HoverContainer>

  <AModal
    v-model:visible="show"
    :fullscreen="getIsMobile"
    :title="$t('layout.themeStore.title')"
    :width="getIsMobile ? '100%' : '55%'"
    draggable
    @cancel="toggleModal"
  >
    <AScrollbar class="h-full overflow-y-auto" outer-class="h-full">
      <ThemeStore />
    </AScrollbar>
    <template #footer>
      <div
        :class="getIsMobile ? 'flex-col' : ''"
        class="flex justify-between items-center"
      >
        <span :class="[getIsMobile ? 'text-center w-full' : '']"
          >{{ $t('layout.themeStore.currentTheme') }}：{{
            getThemePro?.themeName ?? '默认主题'
          }}</span
        >
        <AButton
          :class="[getIsMobile ? 'w-full mt-5px' : '']"
          status="danger"
          type="primary"
          @click="resetTheme"
        >
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
  import { defaultSetting } from '@/settings';

  const show = ref(false);
  const { getThemePro, setThemePro, setThemeAllColor, getIsMobile } =
    useRootSetting();

  // 打开/关闭主题商店
  const toggleModal = () => {
    show.value = !show.value;
  };

  // 重置主题
  const resetTheme = async () => {
    resetProTheme();
    const { colors } = defaultSetting.themeSetting;
    setThemePro(null);

    setThemeColors(colors);
    setThemeAllColor(colors);
  };
</script>

<style lang="less" scoped></style>
