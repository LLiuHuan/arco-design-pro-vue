<script setup lang="ts">
import type { SupportedLanguagesType } from '@arco/locales';
import type {
  BreadcrumbStyleType,
  BuiltinThemeType,
  ContentCompactType,
  LayoutHeaderMenuAlignType,
  LayoutHeaderModeType,
  LayoutType,
  NavigationStyleType,
  PreferencesButtonPositionType,
  ThemeModeType,
} from '@arco/types';

import type { SegmentedItem } from '@arco-core/shadcn-ui';

import { computed, ref } from 'vue';

import { Copy, RotateCw } from '@arco/icons';
import { $t, loadLocaleMessages } from '@arco/locales';
import {
  clearPreferencesCache,
  preferences,
  resetPreferences,
  usePreferences,
} from '@arco/preferences';

import { useArcoDrawer } from '@arco-core/popup-ui';
import {
  ArcoButton,
  ArcoIconButton,
  ArcoSegmented,
} from '@arco-core/shadcn-ui';
import { globalShareState } from '@arco-core/shared/global-state';

import { useClipboard } from '@vueuse/core';

import {
  Animation,
  Block,
  Breadcrumb,
  BuiltinTheme,
  ColorMode,
  Content,
  Copyright,
  Footer,
  General,
  GlobalShortcutKeys,
  Header,
  Layout,
  Navigation,
  Radius,
  Sidebar,
  Tabbar,
  Theme,
  Widget,
} from './blocks';

const emit = defineEmits<{ clearPreferencesAndLogout: [] }>();

const message = globalShareState.getMessage();

const appLocale = defineModel<SupportedLanguagesType>('appLocale');
const appDynamicTitle = defineModel<boolean>('appDynamicTitle');
const appLayout = defineModel<LayoutType>('appLayout');
const appColorGrayMode = defineModel<boolean>('appColorGrayMode');
const appColorWeakMode = defineModel<boolean>('appColorWeakMode');
const appContentCompact = defineModel<ContentCompactType>('appContentCompact');
const appWatermark = defineModel<boolean>('appWatermark');
const appEnableCheckUpdates = defineModel<boolean>('appEnableCheckUpdates');
const appPreferencesButtonPosition = defineModel<PreferencesButtonPositionType>(
  'appPreferencesButtonPosition',
);

const transitionProgress = defineModel<boolean>('transitionProgress');
const transitionName = defineModel<string>('transitionName');
const transitionLoading = defineModel<boolean>('transitionLoading');
const transitionEnable = defineModel<boolean>('transitionEnable');

const themeColorPrimary = defineModel<string>('themeColorPrimary');
const themeBuiltinType = defineModel<BuiltinThemeType>('themeBuiltinType');
const themeMode = defineModel<ThemeModeType>('themeMode');
const themeRadius = defineModel<string>('themeRadius');
const themeSemiDarkSidebar = defineModel<boolean>('themeSemiDarkSidebar');
const themeSemiDarkHeader = defineModel<boolean>('themeSemiDarkHeader');

const sidebarEnable = defineModel<boolean>('sidebarEnable');
const sidebarWidth = defineModel<number>('sidebarWidth');
const sidebarCollapsed = defineModel<boolean>('sidebarCollapsed');
const sidebarCollapsedShowTitle = defineModel<boolean>(
  'sidebarCollapsedShowTitle',
);
const sidebarAutoActivateChild = defineModel<boolean>(
  'sidebarAutoActivateChild',
);
const sidebarExpandOnHover = defineModel<boolean>('sidebarExpandOnHover');
const sidebarCollapsedButton = defineModel<boolean>('sidebarCollapsedButton');
const sidebarFixedButton = defineModel<boolean>('sidebarFixedButton');
const headerEnable = defineModel<boolean>('headerEnable');
const headerMode = defineModel<LayoutHeaderModeType>('headerMode');
const headerMenuAlign =
  defineModel<LayoutHeaderMenuAlignType>('headerMenuAlign');

const breadcrumbEnable = defineModel<boolean>('breadcrumbEnable');
const breadcrumbShowIcon = defineModel<boolean>('breadcrumbShowIcon');
const breadcrumbShowHome = defineModel<boolean>('breadcrumbShowHome');
const breadcrumbStyleType = defineModel<BreadcrumbStyleType>(
  'breadcrumbStyleType',
);
const breadcrumbHideOnlyOne = defineModel<boolean>('breadcrumbHideOnlyOne');

const tabbarEnable = defineModel<boolean>('tabbarEnable');
const tabbarShowIcon = defineModel<boolean>('tabbarShowIcon');
const tabbarShowMore = defineModel<boolean>('tabbarShowMore');
const tabbarShowMaximize = defineModel<boolean>('tabbarShowMaximize');
const tabbarPersist = defineModel<boolean>('tabbarPersist');
const tabbarDraggable = defineModel<boolean>('tabbarDraggable');
const tabbarWheelable = defineModel<boolean>('tabbarWheelable');
const tabbarStyleType = defineModel<string>('tabbarStyleType');
const tabbarMaxCount = defineModel<number>('tabbarMaxCount');
const tabbarMiddleClickToClose = defineModel<boolean>(
  'tabbarMiddleClickToClose',
);

const navigationStyleType = defineModel<NavigationStyleType>(
  'navigationStyleType',
);
const navigationSplit = defineModel<boolean>('navigationSplit');
const navigationAccordion = defineModel<boolean>('navigationAccordion');

// const logoVisible = defineModel<boolean>('logoVisible');

const footerEnable = defineModel<boolean>('footerEnable');
const footerFixed = defineModel<boolean>('footerFixed');

const copyrightSettingShow = defineModel<boolean>('copyrightSettingShow');
const copyrightEnable = defineModel<boolean>('copyrightEnable');
const copyrightCompanyName = defineModel<string>('copyrightCompanyName');
const copyrightCompanySiteLink = defineModel<string>(
  'copyrightCompanySiteLink',
);
const copyrightDate = defineModel<string>('copyrightDate');
const copyrightIcp = defineModel<string>('copyrightIcp');
const copyrightIcpLink = defineModel<string>('copyrightIcpLink');

const shortcutKeysEnable = defineModel<boolean>('shortcutKeysEnable');
const shortcutKeysGlobalSearch = defineModel<boolean>(
  'shortcutKeysGlobalSearch',
);
const shortcutKeysGlobalLogout = defineModel<boolean>(
  'shortcutKeysGlobalLogout',
);

const shortcutKeysGlobalLockScreen = defineModel<boolean>(
  'shortcutKeysGlobalLockScreen',
);

const widgetGlobalSearch = defineModel<boolean>('widgetGlobalSearch');
const widgetFullscreen = defineModel<boolean>('widgetFullscreen');
const widgetLanguageToggle = defineModel<boolean>('widgetLanguageToggle');
const widgetNotification = defineModel<boolean>('widgetNotification');
const widgetThemeToggle = defineModel<boolean>('widgetThemeToggle');
const widgetSidebarToggle = defineModel<boolean>('widgetSidebarToggle');
const widgetLockScreen = defineModel<boolean>('widgetLockScreen');
const widgetRefresh = defineModel<boolean>('widgetRefresh');

const {
  diffPreference,
  isDark,
  isFullContent,
  isHeaderNav,
  isHeaderSidebarNav,
  isMixedNav,
  isSideMixedNav,
  isSideMode,
  isSideNav,
} = usePreferences();
const { copy } = useClipboard({ legacy: true });

const [Drawer] = useArcoDrawer();

const activeTab = ref('appearance');

const tabs = computed((): SegmentedItem[] => {
  return [
    {
      label: $t('preferences.appearance'),
      value: 'appearance',
    },
    {
      label: $t('preferences.layout'),
      value: 'layout',
    },
    {
      label: $t('preferences.shortcutKeys.title'),
      value: 'shortcutKey',
    },
    {
      label: $t('preferences.general'),
      value: 'general',
    },
  ];
});

const showBreadcrumbConfig = computed(() => {
  return (
    !isFullContent.value &&
    !isMixedNav.value &&
    !isHeaderNav.value &&
    preferences.header.enable
  );
});

async function handleCopy() {
  await copy(JSON.stringify(diffPreference.value, null, 2));

  message.copyPreferencesSuccess?.(
    $t('preferences.copyPreferencesSuccessTitle'),
    $t('preferences.copyPreferencesSuccess'),
  );
}

async function handleClearCache() {
  resetPreferences();
  clearPreferencesCache();
  emit('clearPreferencesAndLogout');
}

async function handleReset() {
  if (!diffPreference.value) {
    return;
  }
  resetPreferences();
  await loadLocaleMessages(preferences.app.locale);
}
</script>

<template>
  <div>
    <Drawer
      :description="$t('preferences.subtitle')"
      :title="$t('preferences.title')"
      class="sm:max-w-sm"
    >
      <template #extra>
        <div class="flex items-center">
          <ArcoIconButton
            :disabled="!diffPreference"
            :tooltip="$t('preferences.resetTip')"
            class="relative"
          >
            <span
              v-if="diffPreference"
              class="bg-primary absolute right-0.5 top-0.5 h-2 w-2 rounded"
            ></span>
            <RotateCw class="size-4" @click="handleReset" />
          </ArcoIconButton>
        </div>
      </template>

      <div class="p-1">
        <ArcoSegmented v-model="activeTab" :tabs="tabs">
          <template #general>
            <Block :title="$t('preferences.general')">
              <General
                v-model:app-dynamic-title="appDynamicTitle"
                v-model:app-enable-check-updates="appEnableCheckUpdates"
                v-model:app-locale="appLocale"
                v-model:app-watermark="appWatermark"
              />
            </Block>

            <Block :title="$t('preferences.animation.title')">
              <Animation
                v-model:transition-enable="transitionEnable"
                v-model:transition-loading="transitionLoading"
                v-model:transition-name="transitionName"
                v-model:transition-progress="transitionProgress"
              />
            </Block>
          </template>
          <template #appearance>
            <Block :title="$t('preferences.theme.title')">
              <Theme
                v-model="themeMode"
                v-model:theme-semi-dark-header="themeSemiDarkHeader"
                v-model:theme-semi-dark-sidebar="themeSemiDarkSidebar"
              />
            </Block>
            <Block :title="$t('preferences.theme.builtin.title')">
              <BuiltinTheme
                v-model="themeBuiltinType"
                v-model:theme-color-primary="themeColorPrimary"
                :is-dark="isDark"
              />
            </Block>
            <Block :title="$t('preferences.theme.radius')">
              <Radius v-model="themeRadius" />
            </Block>
            <Block :title="$t('preferences.other')">
              <ColorMode
                v-model:app-color-gray-mode="appColorGrayMode"
                v-model:app-color-weak-mode="appColorWeakMode"
              />
            </Block>
          </template>
          <template #layout>
            <Block :title="$t('preferences.layout')">
              <Layout v-model="appLayout" />
            </Block>
            <Block :title="$t('preferences.content')">
              <Content v-model="appContentCompact" />
            </Block>

            <Block :title="$t('preferences.sidebar.title')">
              <Sidebar
                v-model:sidebar-auto-activate-child="sidebarAutoActivateChild"
                v-model:sidebar-collapsed="sidebarCollapsed"
                v-model:sidebar-collapsed-show-title="sidebarCollapsedShowTitle"
                v-model:sidebar-enable="sidebarEnable"
                v-model:sidebar-expand-on-hover="sidebarExpandOnHover"
                v-model:sidebar-width="sidebarWidth"
                v-model:sidebar-collapsed-button="sidebarCollapsedButton"
                v-model:sidebar-fixed-button="sidebarFixedButton"
                :current-layout="appLayout"
                :disabled="!isSideMode"
              />
            </Block>

            <Block :title="$t('preferences.header.title')">
              <Header
                v-model:header-enable="headerEnable"
                v-model:header-menu-align="headerMenuAlign"
                v-model:header-mode="headerMode"
                :disabled="isFullContent"
                :current-layout="appLayout"
              />
            </Block>

            <Block :title="$t('preferences.navigationMenu.title')">
              <Navigation
                v-model:navigation-accordion="navigationAccordion"
                v-model:navigation-split="navigationSplit"
                v-model:navigation-style-type="navigationStyleType"
                :disabled="isFullContent"
                :disabled-navigation-split="!isMixedNav"
              />
            </Block>

            <Block :title="$t('preferences.breadcrumb.title')">
              <Breadcrumb
                v-model:breadcrumb-enable="breadcrumbEnable"
                v-model:breadcrumb-hide-only-one="breadcrumbHideOnlyOne"
                v-model:breadcrumb-show-home="breadcrumbShowHome"
                v-model:breadcrumb-show-icon="breadcrumbShowIcon"
                v-model:breadcrumb-style-type="breadcrumbStyleType"
                :disabled="
                  !showBreadcrumbConfig ||
                  !(isSideNav || isSideMixedNav || isHeaderSidebarNav)
                "
              />
            </Block>
            <Block :title="$t('preferences.tabbar.title')">
              <Tabbar
                v-model:tabbar-draggable="tabbarDraggable"
                v-model:tabbar-enable="tabbarEnable"
                v-model:tabbar-persist="tabbarPersist"
                v-model:tabbar-show-icon="tabbarShowIcon"
                v-model:tabbar-show-maximize="tabbarShowMaximize"
                v-model:tabbar-show-more="tabbarShowMore"
                v-model:tabbar-style-type="tabbarStyleType"
                v-model:tabbar-wheelable="tabbarWheelable"
                v-model:tabbar-max-count="tabbarMaxCount"
                v-model:tabbar-middle-click-to-close="tabbarMiddleClickToClose"
              />
            </Block>
            <Block :title="$t('preferences.widget.title')">
              <Widget
                v-model:app-preferences-button-position="
                  appPreferencesButtonPosition
                "
                v-model:widget-fullscreen="widgetFullscreen"
                v-model:widget-global-search="widgetGlobalSearch"
                v-model:widget-language-toggle="widgetLanguageToggle"
                v-model:widget-lock-screen="widgetLockScreen"
                v-model:widget-notification="widgetNotification"
                v-model:widget-refresh="widgetRefresh"
                v-model:widget-sidebar-toggle="widgetSidebarToggle"
                v-model:widget-theme-toggle="widgetThemeToggle"
              />
            </Block>
            <Block :title="$t('preferences.footer.title')">
              <Footer
                v-model:footer-enable="footerEnable"
                v-model:footer-fixed="footerFixed"
              />
            </Block>
            <Block
              v-if="copyrightSettingShow"
              :title="$t('preferences.copyright.title')"
            >
              <Copyright
                v-model:copyright-company-name="copyrightCompanyName"
                v-model:copyright-company-site-link="copyrightCompanySiteLink"
                v-model:copyright-date="copyrightDate"
                v-model:copyright-enable="copyrightEnable"
                v-model:copyright-icp="copyrightIcp"
                v-model:copyright-icp-link="copyrightIcpLink"
                :disabled="!footerEnable"
              />
            </Block>
          </template>

          <template #shortcutKey>
            <Block :title="$t('preferences.shortcutKeys.global')">
              <GlobalShortcutKeys
                v-model:shortcut-keys-enable="shortcutKeysEnable"
                v-model:shortcut-keys-global-search="shortcutKeysGlobalSearch"
                v-model:shortcut-keys-lock-screen="shortcutKeysGlobalLockScreen"
                v-model:shortcut-keys-logout="shortcutKeysGlobalLogout"
              />
            </Block>
          </template>
        </ArcoSegmented>
      </div>

      <template #footer>
        <ArcoButton
          :disabled="!diffPreference"
          class="mx-4 w-full"
          size="sm"
          variant="default"
          @click="handleCopy"
        >
          <Copy class="mr-2 size-3" />
          {{ $t('preferences.copyPreferences') }}
        </ArcoButton>
        <ArcoButton
          :disabled="!diffPreference"
          class="mr-4 w-full"
          size="sm"
          variant="ghost"
          @click="handleClearCache"
        >
          {{ $t('preferences.clearAndLogout') }}
        </ArcoButton>
      </template>
    </Drawer>
  </div>
</template>
