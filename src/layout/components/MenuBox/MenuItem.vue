<template>
  <div v-if="!item.hidden">
    <template v-if="!item.children && !isArray(item.children)">
      <router-link :to="resolvePath(item.path)">
        <a-menu-item>
          <component :is="item.meta.icon" />
          {{ $t('menu.' + item.name) }}
        </a-menu-item>
      </router-link>
    </template>

    <a-sub-menu v-else>
      <template #title>
        <component :is="item.meta.icon" />
        {{ $t('menu.' + item.name) }}
      </template>
      <menu-item v-for="child in item.children" :item="child" :base-path="item.path" :key="child" />
    </a-sub-menu>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { isArray } from 'lodash-es';
  import { isExternal } from '@/utils';
  export default defineComponent({
    name: 'MenuItem',
    components: {},
    props: {
      item: {
        type: Object,
        required: true,
      },
      basePath: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const resolve = (...pathList: string[]) => {
        let newStrPath = '';
        let newPathList = [...new Set(pathList)];
        let startStr = false;
        let endStr = false;
        for (let i = 0; i < newPathList.length; i++) {
          let strPath = newPathList[i];
          if (strPath == '' || strPath == '/') {
            continue;
          }

          strPath = strPath.replace('\\', '/');

          startStr = strPath.charAt(0) == '/';
          endStr = strPath.charAt(strPath.length - 1) == '/';
          if (!startStr) {
            strPath = '/' + strPath;
          }
          if (endStr) {
            strPath = strPath.substring(0, strPath.length - 1);
          }
          newStrPath += strPath;
        }
        return newStrPath;
      };

      const resolvePath = (routePath) => {
        if (isExternal(routePath)) {
          return routePath;
        }
        if (isExternal(props.basePath)) {
          return props.basePath;
        }
        return resolve(props.basePath, routePath);
      };
      return {
        isArray,
        resolvePath,
        resolve,
      };
    },
  });
</script>

<style scoped></style>
