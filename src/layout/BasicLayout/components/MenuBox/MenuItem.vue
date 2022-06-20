<!--<template>-->
<!--  <div v-if="!item.meta.hidden">-->
<!--    <template v-if="!item.children && !isArray(item.children)">-->
<!--      <a-menu-item-->
<!--        v-if="item.path.indexOf('http://') > -1 || item.path.indexOf('https://') > -1"-->
<!--        :key="item.name"-->
<!--        @click="openPath(item.path)"-->
<!--      >-->
<!--        <component v-if="item.meta.icon" :is="item.meta.icon" />-->
<!--        {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}-->
<!--      </a-menu-item>-->
<!--      <router-link v-else :to="item.path">-->
<!--        <a-menu-item :key="item.name">-->
<!--          <component v-if="item.meta.icon" :is="item.meta.icon" />-->
<!--          {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}-->
<!--        </a-menu-item>-->
<!--      </router-link>-->
<!--    </template>-->
<!--    <a-sub-menu v-else :key="item.name">-->
<!--      <template #title>-->
<!--        <component v-if="item.meta.icon" :is="item.meta.icon" />-->
<!--        {{ item.meta.title.indexOf('menu.') !== -1 ? $t(item.meta.title) : item.meta.title }}-->
<!--      </template>-->
<!--      <menu-item-->
<!--        v-for="(child, index) in item.children"-->
<!--        :item="child"-->
<!--        :base-path="item.path"-->
<!--        :parent="item.name"-->
<!--        :key="index"-->
<!--      />-->
<!--    </a-sub-menu>-->
<!--  </div>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { defineComponent } from 'vue';-->
<!--  import { isArray } from 'lodash-es';-->
<!--  import { isExternal } from '@/utils';-->

<!--  export default defineComponent({-->
<!--    name: 'MenuItem',-->
<!--    components: {},-->
<!--    props: {-->
<!--      item: {-->
<!--        type: Object,-->
<!--        required: true,-->
<!--      },-->
<!--      basePath: {-->
<!--        type: String,-->
<!--        default: '',-->
<!--      },-->
<!--    },-->
<!--    setup(props) {-->
<!--      const resolve = (...pathList: string[]) => {-->
<!--        let newStrPath = '';-->
<!--        const newPathList = [...new Set(pathList)];-->
<!--        let startStr = false;-->
<!--        let endStr = false;-->
<!--        for (let i = 0; i < newPathList.length; i++) {-->
<!--          let strPath = newPathList[i];-->
<!--          if (strPath == '' || strPath == '/') {-->
<!--            continue;-->
<!--          }-->

<!--          strPath = strPath.replace('\\', '/');-->

<!--          startStr = strPath.charAt(0) == '/';-->
<!--          endStr = strPath.charAt(strPath.length - 1) == '/';-->
<!--          if (!startStr) {-->
<!--            strPath = `/${strPath}`;-->
<!--          }-->
<!--          if (endStr) {-->
<!--            strPath = strPath.substring(0, strPath.length - 1);-->
<!--          }-->
<!--          newStrPath += strPath;-->
<!--        }-->
<!--        return newStrPath;-->
<!--      };-->

<!--      const resolvePath = (routePath) => {-->
<!--        if (isExternal(routePath)) {-->
<!--          return routePath;-->
<!--        }-->
<!--        if (isExternal(props.basePath)) {-->
<!--          return props.basePath;-->
<!--        }-->
<!--        return resolve(props.basePath, routePath);-->
<!--      };-->

<!--      const openPath = (path) => {-->
<!--        window.open(path);-->
<!--      };-->
<!--      return {-->
<!--        isArray,-->
<!--        resolvePath,-->
<!--        resolve,-->
<!--        openPath,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style scoped></style>-->
