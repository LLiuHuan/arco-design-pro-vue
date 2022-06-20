<!--<template>-->
<!--  <router-view v-slot="{ Component, route }">-->
<!--    <transition :name="getTransitionName" mode="out-in" appear>-->
<!--      <keep-alive v-if="keepAliveComponents" :include="keepAliveComponents">-->
<!--        <div :key="route.fullPath">-->
<!--          <component :is="Component" :key="route.fullPath" />-->
<!--        </div>-->
<!--      </keep-alive>-->
<!--      <div v-else :key="route.fullPath">-->
<!--        <component :is="Component" :key="route.fullPath" />-->
<!--      </div>-->
<!--    </transition>-->
<!--  </router-view>-->
<!--</template>-->

<!--<script lang="ts">-->
<!--  import { computed, defineComponent, unref } from 'vue';-->
<!--  import { useProjectSetting } from '@/hooks/setting/useProjectSetting';-->
<!--  import { useRouterStore } from '@/store/modules/routers';-->

<!--  export default defineComponent({-->
<!--    name: 'MainView',-->
<!--    setup() {-->
<!--      const { getIsPageAnimate, getPageAnimateType } = useProjectSetting();-->
<!--      const asyncRouteStore = useRouterStore();-->
<!--      // 需要缓存的路由组件-->
<!--      const keepAliveComponents = computed(() => asyncRouteStore.keepAliveComponents);-->

<!--      const getTransitionName = computed(() => {-->
<!--        return unref(getIsPageAnimate) ? unref(getPageAnimateType) : '';-->
<!--      });-->

<!--      return {-->
<!--        keepAliveComponents,-->
<!--        getTransitionName,-->
<!--      };-->
<!--    },-->
<!--  });-->
<!--</script>-->

<!--<style scoped></style>-->
