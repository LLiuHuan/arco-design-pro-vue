<template>
  <span class="headerAvatar">
    <template v-if="picType === 'avatar'">
      <a-avatar :size="30" :src="avatar">
        <img :src="avatar" />
      </a-avatar>
    </template>
    <template v-else-if="picType === 'img'">
      <img :src="avatar" class="avatar" />
    </template>
    <template v-else-if="picType === 'file'">
      <img :src="avatar" class="file" />
    </template>
    <template v-else-if="picType === 'text'">
      <a-avatar :style="{ backgroundColor: '#3370ff' }">{{ picSrc }}</a-avatar>
    </template>
  </span>
</template>

<script lang="ts">
  import { computed, defineComponent, reactive, toRefs } from 'vue';
  import noAvatar from '@/assets/noBody.png';
  const path = import.meta.env.VITE_BASE_API;
  export default defineComponent({
    name: 'CustomPic',
    props: {
      picType: {
        type: String,
        required: false,
        default: 'avatar',
      },
      picSrc: {
        type: String,
        required: false,
        default: '',
      },
    },
    setup(props) {
      const state = reactive({
        noAvatar: noAvatar,
        path: path + '/',
      });

      const avatar = computed(() => {
        if (props.picSrc === '') {
          return noAvatar;
        } else {
          if (props.picSrc !== '' && props.picSrc.slice(0, 4) === 'http') {
            return props.picSrc;
          }
          return state.path + props.picSrc;
        }
      });

      return {
        ...toRefs(state),
        avatar,
      };
    },
  });
</script>

<style scoped>
  @import './styles/index.less';
</style>
