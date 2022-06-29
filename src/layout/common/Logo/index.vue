<template>
  <router-link :to="routeHomePath" class="flex-center w-full nowrap-hidden">
    <system-logo v-if="!props.pngLogo" class="text-24px text-primary" />
    <img v-else-if="props.pngLogo" class="w-24px" :src="props.pngLogo" alt="" />
    <h2
      v-show="props.showTitle"
      class="pl-10px text-18px font-bold text-primary transition duration-300 ease-in-out"
    >
      {{ title }}
    </h2>
  </router-link>
</template>

<script setup lang="ts">
  import { routePath } from '@/router';
  import { useAppInfo } from '@/composables';

  interface Props {
    /** 显示名字 */
    showTitle: boolean;

    /** png logo */
    pngLogo?: string;
  }

  const props = defineProps<Props>();

  const { title } = useAppInfo();
  const routeHomePath = routePath('root');
</script>
<style scoped></style>
