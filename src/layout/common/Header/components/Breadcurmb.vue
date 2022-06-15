<template>
  <!-- 面包屑 -->
  <a-breadcrumb>
    <template v-for="breadcrumb in breadcrumbs" :key="breadcrumb.key">
      <a-breadcrumb-item>
        <a-dropdown v-if="breadcrumb.hasChildren" @select="dropdownSelect" trigger="hover">
          <template #content>
            <a-doption
              v-for="(item, itemIndex) in breadcrumb.children"
              :value="item"
              :key="itemIndex"
            >
              <component
                :is="item.icon"
                v-if="theme.header.crumb.showIcon"
                class="inline-block align-text-bottom mr-4px text-16px"
              />
              <span>{{ item.label }}</span>
            </a-doption>
          </template>
          <span class="link-text">
            <component
              class="inline-block align-text-bottom mr-4px text-16px"
              v-if="theme.header.crumb.showIcon"
              :is="breadcrumb.icon"
              :class="{ 'text-#BBBBBB': theme.header.inverted }"
            />
            <span :class="{ 'text-#BBBBBB': theme.header.inverted }">{{ breadcrumb.label }}</span>
          </span>
        </a-dropdown>
        <span class="link-text" v-else>
          <component
            class="inline-block align-text-bottom mr-4px text-16px"
            v-if="theme.header.crumb.showIcon"
            :is="breadcrumb.icon"
            :class="{ 'text-#BBBBBB': theme.header.inverted }"
          />
          <span :class="{ 'text-#BBBBBB': theme.header.inverted }">{{ breadcrumb.label }}</span>
        </span>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';
  import { routePath } from '@/router';
  import { useThemeStore, useRouteStore } from '@/store';
  import { useRouterPush } from '@/composables';
  import { getBreadcrumbByRouteKey } from '@/utils';

  const route = useRoute();
  const theme = useThemeStore();
  const routeStore = useRouteStore();
  const { routerPush } = useRouterPush();

  const breadcrumbs = computed(() =>
    getBreadcrumbByRouteKey(
      route.name as string,
      routeStore.menus as GlobalMenuOption[],
      routePath('root')
    )
  );
  console.log(breadcrumbs);

  function dropdownSelect(menuOption: GlobalMenuOption) {
    console.log(menuOption);
    routerPush({ name: menuOption.routeName });
  }
</script>

<style lang="less" scoped></style>
