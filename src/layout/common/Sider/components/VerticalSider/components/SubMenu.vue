<template>
  <div v-if="!item.meta.hidden">
    <template v-if="!item.children && !isArray(item.children)">
      <a-menu-item
        v-if="item.path.indexOf('http://') > -1 || item.path.indexOf('https://') > -1"
        :key="item.name"
        @click="openPath(item.path)"
      >
        <component v-if="item.meta.icon" :is="item.meta.icon" />
        {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}
      </a-menu-item>
      <router-link v-else :to="item.path">
        <a-menu-item :key="item.name">
          <component v-if="item.meta.icon" :is="item.meta.icon" />
          {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}
        </a-menu-item>
      </router-link>
    </template>
    <a-sub-menu v-else :key="item.name">
      <template #title>
        <component v-if="item.meta.icon" :is="item.meta.icon" />
        {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}
      </template>
      <menu-item
        v-for="(child, index) in item.children"
        :item="child"
        :base-path="item.path"
        :parent="item.name"
        :key="index"
      />
    </a-sub-menu>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped></style>
