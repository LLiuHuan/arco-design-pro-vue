<template>
  <!-- LOGO VIEW -->
  <icon-custom-logo-fill v-if="props.fill" />
  <icon-custom-logo v-else />
</template>

<script lang="ts" setup>
  interface Props {
    /** logo是否填充 */
    fill?: boolean;
  }

  const props = withDefaults(defineProps<Props>(), {
    fill: false,
  });
</script>
<style scoped></style>
