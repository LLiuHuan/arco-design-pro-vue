<template>
  <a-breadcrumb class="cursor-pointer">
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <a-breadcrumb-item>
        <a-dropdown
          v-if="breadcrumb.children"
          trigger="hover"
          @select="dropdownSelect"
        >
          <template #content>
            <a-doption
              v-for="(item, itemIndex) in breadcrumb.children"
              :key="itemIndex"
              :value="item"
            >
              <component
                :is="item.icon"
                v-if="getHeaderShowBreadCrumbIcon"
                class="inline-block align-text-bottom mr-4px text-16px"
              />
              <span>{{
                item.meta.i18nTitle ? $t(item.meta.i18nTitle) : item.meta.title
              }}</span>
            </a-doption>
          </template>
          <span class="link-text">
            <component
              :is="breadcrumb.icon"
              v-if="getHeaderShowBreadCrumbIcon"
              class="inline-block align-text-bottom mr-4px text-16px"
            />
            <span>{{
              breadcrumb.meta.i18nTitle
                ? $t(breadcrumb.meta.i18nTitle)
                : breadcrumb.meta.title
            }}</span>
          </span>
        </a-dropdown>
        <span v-else class="link-text">
          <component
            :is="breadcrumb.icon"
            v-if="getHeaderShowBreadCrumbIcon"
            class="inline-block align-text-bottom mr-4px text-16px"
          />
          <span>{{
            breadcrumb.meta.i18nTitle
              ? $t(breadcrumb.meta.i18nTitle)
              : breadcrumb.meta.title
          }}</span>
        </span>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { computed, unref } from 'vue';
  import { getBreadcrumbByRouteKey, routePath } from '@/utils/router';
  import { useRouter } from 'vue-router';
  import { useRouteStoreWithOut } from '@/store/modules/route';
  import { PageEnum } from '@/enums';
  import { useHeaderSetting } from '@/hooks/setting';
  import { App } from '~/types/app';
  import { useGo } from '@/hooks/web/usePage';

  const { currentRoute } = useRouter();
  const { getMenus } = useRouteStoreWithOut();
  const { getHeaderShowBreadCrumbIcon } = useHeaderSetting();
  const { goKey } = useGo();

  const pathSplitMark = '/';
  const routeSplitMark = '_';

  const breadcrumbs = computed(() =>
    getBreadcrumbByRouteKey(
      unref(currentRoute).name
        ? String(unref(currentRoute).name)
        : unref(currentRoute).fullPath.replaceAll(
            pathSplitMark,
            routeSplitMark,
          ),
      getMenus,
      routePath(PageEnum.LOGIN),
    ),
  );

  function dropdownSelect(menuOption: App.Menu) {
    goKey(menuOption.routeName);
  }
</script>

<style lang="less" scoped></style>
