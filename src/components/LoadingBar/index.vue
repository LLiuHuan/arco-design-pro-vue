<template>
  <a-progress
    v-if="!hide"
    :percent="percent"
    animation
    :show-text="false"
    style="position: absolute; height: 2px; top: -1px; z-index: 9999"
    :status="percent >= 98 ? 'success' : 'normal'"
  />
</template>

<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  export default defineComponent({
    name: 'LoadingBar',
    setup() {
      const loadingTimer = ref();
      const state = reactive({
        percent: ref<number>(30),
        hide: ref<boolean>(true),
      });

      const loading = () => {
        state.hide = false;
        state.percent = 30;
        loadingTimer.value = setInterval(() => {
          if (state.percent <= 98) {
            state.percent = state.percent > 80 ? state.percent + 1 : state.percent + 10;
          }
        }, 1000);
      };

      const success = () => {
        clearInterval(loadingTimer.value);
        state.percent = 100;

        console.log(state.percent);
        setTimeout(() => {
          state.hide = true;
        }, 300);
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
