<template>
  {{ percent }}
  <a-progress
    v-if="!hide"
    :percent="percent"
    animation
    style="position: absolute; height: 2px; top: -1px; z-index: 9999"
    :status="percent >= 0.98 ? 'success' : 'normal'"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';

  export default defineComponent({
    name: 'LoadingBar',
    setup() {
      const loadingTimer = ref();
      const state = reactive({
        percent: ref<number>(0.3),
        hide: ref<boolean>(true),
      });

      const loading = () => {
        state.hide = false;
        state.percent = 0.3;

        loadingTimer.value = setInterval(() => {
          if (state.percent <= 0.98) {
            state.percent = state.percent > 0.8 ? state.percent + 0.01 : state.percent + 0.1;
          }
        }, 1000);
      };

      const success = () => {
        state.percent = 1;

        clearInterval(loadingTimer.value);
        setTimeout(() => {
          state.hide = true;
        }, 3000);
      };

      return {
        ...toRefs(state),
        loading,
        success,
      };
    },
  });
</script>

<style scoped></style>
