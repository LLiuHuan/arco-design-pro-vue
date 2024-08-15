<template>
  <ABreadcrumb v-if="getHeaderShowBreadCrumb" class="cursor-pointer">
    <DefineBreadcrumbContent v-slot="{ breadcrumb }">
      <div class="i-flex-y-center align-middle">
        <component
          :is="breadcrumb.icon"
          v-if="getHeaderShowBreadCrumbIcon"
          class="inline-block align-text-bottom mr-10px text-16px"
        />
        <span>{{ breadcrumb.label }}</span>
      </div>
    </DefineBreadcrumbContent>

    <ABreadcrumbItem
      v-for="breadcrumb in routeStore.breadcrumbs"
      :key="breadcrumb.key"
    >
      <ADropdown
        v-if="breadcrumb.options"
        trigger="hover"
        @select="handleClickMenu"
      >
        <template #content>
          <ADoption
            v-for="item in breadcrumb.options"
            :key="item.routeKey"
            :value="item.routeKey"
          >
            <BreadcrumbContent :breadcrumb="item" />
          </ADoption>
        </template>
        <BreadcrumbContent :breadcrumb="breadcrumb" />
      </ADropdown>
      <BreadcrumbContent v-else :breadcrumb="breadcrumb" />
    </ABreadcrumbItem>
  </ABreadcrumb>
</template>

<script lang="ts" setup>
  import { useHeaderSetting } from '@/hooks/setting';
  import { useGo } from '@/hooks/web/usePage';
  import { useRouteStore } from '@/store/modules/route';
  import { createReusableTemplate } from '@vueuse/core';
  import type { RouteKey } from '@elegant-router/types';

  const { getHeaderShowBreadCrumbIcon } = useHeaderSetting();
  const { goKey } = useGo();

  const { getHeaderShowBreadCrumb } = useHeaderSetting();

  const routeStore = useRouteStore();

  interface BreadcrumbContentProps {
    breadcrumb: App.Menu;
  }

  const [DefineBreadcrumbContent, BreadcrumbContent] =
    createReusableTemplate<BreadcrumbContentProps>();

  function handleClickMenu(key: RouteKey) {
    goKey(key);
  }
</script>

<style lang="less" scoped></style>
